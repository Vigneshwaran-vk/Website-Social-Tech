import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { NAV_LINKS, SITE } from '../lib/content';
import { easeArray } from '../styles/theme';
import { LogoMark } from './Logo';
import { Container } from './ui';

/* ───────────────────────────────────────────────────────────── */

// Dark gradient with a faint texture – feels premium without clutter
const Wrap = styled.footer`
  background: linear-gradient(180deg, #0a0c12 0%, #060709 100%);
  color: #f3f5fa;
  position: relative;
  overflow: hidden;
`;

// Subtle top‑border glow that ties back to the brand colour
const TopGlow = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(43, 92, 255, 0.7) 35%,
    rgba(43, 92, 255, 0.7) 65%,
    transparent
  );
  box-shadow: 0 0 30px rgba(43, 92, 255, 0.3);
`;

// Grid layout – three columns on desktop, stacked on mobile
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.2fr;
  gap: clamp(32px, 4vw, 64px);
  padding: clamp(60px, 8vw, 120px) 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

// Left column – branding + short story
const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Tagline = styled.p`
  font-size: clamp(14px, 1.2vw, 18px);
  line-height: 1.6;
  color: rgba(243, 245, 250, 0.6);
  max-width: 38ch;
`;

// Middle column – newsletter sign‑up
const Newsletter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NewsLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(243, 245, 250, 0.35);
`;

const InputWrap = styled.div`
  display: flex;
  border: 1px solid rgba(243, 245, 250, 0.15);
  border-radius: 8px;
  overflow: hidden;
`;

const EmailInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 11px 14px;
  font-size: 14px;
  color: #f3f5fa;
  ::placeholder { color: rgba(243, 245, 250, 0.4); }
  outline: none;
`;

const SubscribeBtn = styled.button`
  background: #2b5cff;
  color: #fff;
  border: none;
  padding: 0 18px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.25s;
  &:hover { background: #1a4bf0; }
`;

// Right column – quick links + social icons
const Extras = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LinkItem = styled(Link)`
  font-size: 15px;
  font-weight: 500;
  color: rgba(243, 245, 250, 0.6);
  transition: color 0.25s;
  &:hover { color: #f3f5fa; }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled.a`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(243, 245, 250, 0.4);
  transition: color 0.25s, transform 0.2s;
  &:hover { color: #fff; transform: translateY(-2px); }
`;

// Bottom bar – thin, centered copyright
const BottomBar = styled.div`
  border-top: 1px solid rgba(243, 245, 250, 0.07);
  padding: 16px 0;
  font-size: 13px;
  color: rgba(243, 245, 250, 0.3);
  text-align: center;
`;

/* ───────────────────────────────────────────────────────────── */

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <Wrap ref={ref}>
      <TopGlow />
      <Container>
        <Grid>
          {/* ── Branding ───────────────────── */}
          <Brand>
            <LogoMark size={42} />
            <Tagline>
              We built a platform that puts local shops on the internet – no warehouses, no
              middle‑men, just the people who own the street.
            </Tagline>
          </Brand>

          {/* ── Newsletter ─────────────────── */}
          <Newsletter>
            <NewsLabel>Stay in the loop</NewsLabel>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1, ease: easeArray }}
            >
              <InputWrap>
                <EmailInput type="email" placeholder="your@email.com" />
                <SubscribeBtn type="button">Subscribe</SubscribeBtn>
              </InputWrap>
            </motion.div>
          </Newsletter>

          {/* ── Extras ─────────────────────── */}
          <Extras>
            <nav>
              <Links>
{NAV_LINKS.map((l) => (
                    <li key={l.to}>
                      <LinkItem to={l.to}>{l.label}</LinkItem>
                    </li>
                  ))}
              </Links>
            </nav>
            <SocialRow>
              <SocialIcon href={SITE.icmUrl} target="_blank" rel="noopener noreferrer" aria-label="Indian City Market">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1.8 14.9l-2.5-2.5a3.4 3.4 0 01-1.4 1l3.9 1.5zM12 6a6 6 0 110 12 6 6 0 010-12z" fill="currentColor" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SITE.mainSite} target="_blank" rel="noopener noreferrer" aria-label="Social Technologies">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2l4 8h8l-6 5 2 9-7-5-7 5 2-9-6-5h8l4-8z" fill="currentColor" />
                </svg>
              </SocialIcon>
            </SocialRow>
          </Extras>
        </Grid>

        {/* ── Bottom bar ───────────────────── */}
        <BottomBar>
          © 2026 Social Technologies – Built in Chennai, India. All rights reserved.
        </BottomBar>
      </Container>
    </Wrap>
  );
}
