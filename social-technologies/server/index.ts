import express from 'express';
import nodemailer from 'nodemailer';
import { appendFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Load .env if there is one (Node 20.6+)
try {
  process.loadEnvFile(path.join(root, '.env'));
} catch {
  /* no .env file: rely on real environment variables */
}

const PORT = Number(process.env.PORT) || 8787;
const OWNER_EMAIL = process.env.OWNER_EMAIL || '';
const DATA_DIR = path.join(root, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.jsonl');

const smtpReady = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && OWNER_EMAIL,
);

const transporter = smtpReady
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: (Number(process.env.SMTP_PORT) || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

if (!smtpReady) {
  console.warn(
    '[contact] Email is NOT configured (set OWNER_EMAIL and SMTP_* in .env). Messages will still be saved to data/messages.jsonl.',
  );
}

interface ContactBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
}

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/\r/g, '').trim().slice(0, max) : '';
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// tiny in-memory rate limit: 5 messages per 10 minutes per IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const app = express();
if (process.env.TRUST_PROXY) app.set('trust proxy', Number(process.env.TRUST_PROXY) || 1);
app.disable('x-powered-by');
app.use(express.json({ limit: '30kb' }));

app.post('/api/contact', async (req, res) => {
  const body = (req.body ?? {}) as ContactBody;

  // bots fill the hidden field: pretend it worked, store nothing
  if (clean(body.website, 200)) {
    res.json({ ok: true });
    return;
  }

  const ip = req.ip || 'unknown';
  if (limited(ip)) {
    res.status(429).json({ ok: false, error: 'Too many messages. Please try again in a few minutes.' });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160);
  const topic = clean(body.topic, 80) || 'General question';
  const message = clean(body.message, 5000);

  if (!name) {
    res.status(400).json({ ok: false, error: 'Please enter your name.' });
    return;
  }
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    return;
  }
  if (message.length < 5) {
    res.status(400).json({ ok: false, error: 'Please write a short message.' });
    return;
  }

  const record = {
    id: randomUUID(),
    receivedAt: new Date().toISOString(),
    name,
    email,
    company,
    topic,
    message,
    emailed: false,
  };

  // 1) Save first, so a message is never lost
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(MESSAGES_FILE, JSON.stringify(record) + '\n', 'utf8');
  } catch (err) {
    console.error('[contact] Could not save message:', err);
    res.status(500).json({ ok: false, error: 'We could not save your message. Please try again.' });
    return;
  }

  // 2) Email the owner
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: OWNER_EMAIL,
        replyTo: `"${oneLine(name).replace(/"/g, '')}" <${email}>`,
        subject: `New message from ${oneLine(name)} — ${oneLine(topic)}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nTopic: ${topic}\n\n${message}\n\nReceived: ${record.receivedAt}`,
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0d0d0d">
          <h2 style="margin:0 0 12px">New message on Social Technologies</h2>
          <p><b>Name:</b> ${escapeHtml(name)}<br>
          <b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
          <b>Company:</b> ${escapeHtml(company) || '-'}<br>
          <b>Topic:</b> ${escapeHtml(topic)}</p>
          <p style="white-space:pre-wrap;border-left:4px solid #1f4bff;padding-left:12px">${escapeHtml(message)}</p>
          <p style="color:#777;font-size:12px">Received ${record.receivedAt}</p></div>`,
      });
      record.emailed = true;
      await appendFile(
        MESSAGES_FILE,
        JSON.stringify({ id: record.id, emailedAt: new Date().toISOString() }) + '\n',
        'utf8',
      );
    } catch (err) {
      console.error('[contact] Email failed (message is saved):', err);
    }
  }

  res.json({ ok: true, emailed: record.emailed });
});

// Serve the built website
const dist = path.join(root, 'dist');
if (existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '1h', index: false }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT}${existsSync(dist) ? '' : '  (API only — run "npm run build" to serve the site)'}`);
});
