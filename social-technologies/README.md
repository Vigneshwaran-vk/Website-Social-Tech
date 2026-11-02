# Social Technologies website

React + TypeScript + styled-components (no Tailwind), built with Vite.
Pages: Home, About, Features, Contact. A small Express server saves and emails contact messages.

## Run it

```bash
npm install
cp .env.example .env     # then fill in OWNER_EMAIL and the SMTP_* values
npm run dev              # site on http://localhost:5173 (+ API on :8787)
```

Production:

```bash
npm run build
npm start                # serves the built site AND /api/contact on PORT (default 8787)
```

The contact form needs the Node server, so host it somewhere that runs Node
(Render, Railway, a VPS…), not on a static-only host.

## Contact messages

Every message is **saved first** to `data/messages.jsonl` (one JSON object per line),
then **emailed** to `OWNER_EMAIL` with the visitor as Reply-To. If email is not set up
or fails, the message is still saved and the error is logged.

Gmail: turn on 2-step verification, create an App Password, and use it as `SMTP_PASS`
(`SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`).

Built in: required-field checks, a hidden spam trap field, and a 5-messages-per-10-minutes
limit per IP. Behind a proxy (Render, nginx…) set `TRUST_PROXY=1`.

## Edit the content

- `src/lib/content.ts`: all copy (services, steps, team, topic chips). It is draft text, so edit freely.
- `src/lib/images.ts`: every photo. They are placeholders from picsum.photos; replace each URL
  with your own picture (for example a file in `public/photos/` → `'/photos/shop.jpg'`).
- `src/pages/About.tsx` / `TEAM` in content.ts: add a `photo` URL to replace the monogram cards.
- `src/styles/theme.ts`: colours and fonts (off-white, black, one blue `#1f4bff`).
- `public/favicon.svg`: the logo / browser tab icon (also drawn in `src/components/Logo.tsx`).

## Motion

Smooth scrolling: Lenis. Scroll and mouse animations: Framer Motion.
Everything switches off for visitors who have "reduce motion" turned on.
