import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import {
  Accent,
  Container,
  Display,
  Eyebrow,
  H3,
  Lead,
  Section,
  SubmitButton,
  Arrow,
} from '../components/ui';
import { LineReveal } from '../components/LineReveal';
import { ParallaxImage } from '../components/ParallaxImage';
import { Reveal } from '../components/Reveal';
import { SITE, TOPICS } from '../lib/content';
import { IMG } from '../lib/images';
import { usePageTitle } from '../lib/usePageTitle';

const Hero = styled.section`
  padding: clamp(130px, 15vw, 210px) 0 clamp(24px, 4vw, 48px);
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 34px);
  align-items: flex-start;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: clamp(32px, 6vw, 96px);
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 32px);
`;

const Two = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(22px, 3vw, 32px);

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  input,
  textarea {
    font: inherit;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
    text-transform: none;
    color: ${({ theme }) => theme.colors.ink};
    background: transparent;
    border: 0;
    border-bottom: 2px solid ${({ theme }) => theme.colors.ink};
    border-radius: 0;
    padding: 10px 0 12px;
    outline: none;
    transition: border-color 0.3s;
    width: 100%;
  }
  textarea {
    resize: vertical;
    min-height: 140px;
    line-height: 1.5;
  }
  input:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.blue};
  }
  input::placeholder,
  textarea::placeholder {
    color: rgba(13, 13, 13, 0.35);
  }
`;

const Legend = styled.span`
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
`;

const Chip = styled.button<{ $on: boolean }>`
  padding: 12px 20px;
  border-radius: 999px;
  border: 1.5px solid ${({ theme, $on }) => ($on ? theme.colors.blue : theme.colors.ink)};
  background: ${({ theme, $on }) => ($on ? theme.colors.blue : 'transparent')};
  color: ${({ $on }) => ($on ? '#fff' : 'inherit')};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
  transition: all 0.3s ${({ theme }) => theme.ease};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

const Hidden = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const Notice = styled.p<{ $kind: 'ok' | 'err' }>`
  padding: 16px 20px;
  border-radius: 18px;
  font-weight: 700;
  background: ${({ theme, $kind }) => ($kind === 'ok' ? theme.colors.ink : '#fff1ef')};
  color: ${({ theme, $kind }) => ($kind === 'ok' ? theme.colors.bg : '#b3261e')};
  border: 1.5px solid ${({ theme, $kind }) => ($kind === 'ok' ? theme.colors.ink : '#b3261e')};
`;

const Side = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 28px;

  .block {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .label {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.muted};
  }
  a.link {
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -0.02em;
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.blue};
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  usePageTitle('Contact');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, topic, message, website: trap }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('sent');
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
      setTopic(TOPICS[0]);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Hero>
        <Container>
          <HeroInner>
            <Eyebrow>Contact</Eyebrow>
            <LineReveal
              as={Display}
              lines={[
                'Say',
                <>
                  <Accent>hello.</Accent>
                </>,
              ]}
            />
            <Reveal delay={0.4} y={24}>
              <Lead>
                Tell us about your shop, platform or idea. Every message goes straight to the
                founder.
              </Lead>
            </Reveal>
          </HeroInner>
        </Container>
      </Hero>

      <Section style={{ paddingTop: 'clamp(32px, 5vw, 64px)' }}>
        <Container>
          <Layout>
            <Reveal>
              <Form onSubmit={submit} noValidate>
                <Two>
                  <Field>
                    Name
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                      maxLength={120}
                    />
                  </Field>
                  <Field>
                    Email
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      maxLength={200}
                    />
                  </Field>
                </Two>

                <Field>
                  Company
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Shop or company (optional)"
                    autoComplete="organization"
                    maxLength={160}
                  />
                </Field>

                <div role="radiogroup" aria-label="Topic">
                  <Legend>What is this about?</Legend>
                  <Chips>
                    {TOPICS.map((t) => (
                      <Chip
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={topic === t}
                        $on={topic === t}
                        onClick={() => setTopic(t)}
                      >
                        {t}
                      </Chip>
                    ))}
                  </Chips>
                </div>

                <Field>
                  Message
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    required
                    maxLength={5000}
                  />
                </Field>

                {/* honeypot: real people never see or fill this */}
                <Hidden aria-hidden="true">
                  <label>
                    Website
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={trap}
                      onChange={(e) => setTrap(e.target.value)}
                    />
                  </label>
                </Hidden>

                {status === 'sent' && (
                  <Notice $kind="ok" role="status">
                    Thank you! Your message has been sent. We will get back to you soon.
                  </Notice>
                )}
                {status === 'error' && (
                  <Notice $kind="err" role="alert">
                    {error}
                  </Notice>
                )}

                <div>
                  <SubmitButton type="submit" $variant="solid" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                    <Arrow />
                  </SubmitButton>
                </div>
              </Form>
            </Reveal>

            <Side>
              <Reveal delay={0.1}>
                <ParallaxImage src={IMG.contact} alt="" ratio="4 / 3" radius={24} depth={9} />
              </Reveal>
              <Reveal delay={0.2}>
                <div className="block">
                  <span className="label">Founder</span>
                  <H3>Prabhu R</H3>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="block">
                  <span className="label">Our L-commerce platform</span>
                  <a className="link" href={SITE.icmUrl} target="_blank" rel="noopener noreferrer">
                    {SITE.icmLabel}
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="block">
                  <span className="label">Main website</span>
                  <a className="link" href={SITE.mainSite} target="_blank" rel="noopener noreferrer">
                    socialtechnologies.in
                  </a>
                </div>
              </Reveal>
            </Side>
          </Layout>
        </Container>
      </Section>
    </>
  );
}
