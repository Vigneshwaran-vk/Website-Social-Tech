import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import styled from 'styled-components';
import { NAV_LINKS, SITE } from '../lib/content';
import { easeArray } from '../styles/theme';
import { LogoMark } from './Logo';
import { Container, ButtonLink } from './ui';

const Wrap = styled.footer`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.darkText};
  padding-top: clamp(64px, 9vw, 120px);
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  padding-bottom: clamp(48px, 8vw, 110px);

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Big = styled.h2`
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  font-size: clamp(34px, 4.8vw, 68px);
  margin-bottom: 28px;

  em {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    font-size: 1.06em;
    color: #8fa6ff;
  }
`;

const Col = styled.div`
  h4 {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.darkMuted};
    margin-bottom: 18px;
  }
  li + li {
    margin-top: 10px;
  }
  a {
    font-weight: 700;
    font-size: 19px;
    letter-spacing: -0.01em;
    transition: color 0.3s;
  }
  a:hover {
    color: #8fa6ff;
  }
`;

const Wordmark = styled.div`
  font-weight: 900;
  letter-spacing: -0.06em;
  line-height: 0.82;
  font-size: 18.6vw;
  white-space: nowrap;
  padding: 0 1.6vw;
  user-select: none;
  margin-bottom: -2.6vw;

  span {
    display: block;
    overflow: hidden;
    padding-top: 0.06em;
  }
  span:last-child {
    font-size: 0.96em;
  }
  em {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const Bottom = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  justify-content: space-between;
  align-items: center;
  padding: 22px 0;
  border-top: 1px solid rgba(243, 245, 250, 0.16);
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkMuted};
  background: ${({ theme }) => theme.colors.dark};
`;

export function Footer() {
  // watch the unclipped wordmark box so the slide-up actually triggers
  const wordRef = useRef<HTMLDivElement>(null);
  const wordIn = useInView(wordRef, { once: true, margin: '0px 0px -5% 0px' });

  return (
    <Wrap>
      <Container>
        <Top>
          <div>
            <Big>
              Let’s make shopping <em>local</em> again.
            </Big>
            <ButtonLink to="/contact" variant="light">
              Start a conversation
            </ButtonLink>
          </div>
          <Col>
            <h4>Pages</h4>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <h4>Find us</h4>
            <ul>
              <li>
                <a href={SITE.icmUrl} target="_blank" rel="noopener noreferrer">
                  {SITE.icmLabel}
                </a>
              </li>
              <li>
                <a href={SITE.mainSite} target="_blank" rel="noopener noreferrer">
                  socialtechnologies.in
                </a>
              </li>
            </ul>
          </Col>
        </Top>
      </Container>

      <Wordmark ref={wordRef} aria-label="Social Technologies">
        <span>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '105%' }}
            animate={{ y: wordIn ? '0%' : '105%' }}
            transition={{ duration: 1.2, ease: easeArray }}
          >
            Social
          </motion.span>
        </span>
        <span>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '105%' }}
            animate={{ y: wordIn ? '0%' : '105%' }}
            transition={{ duration: 1.2, delay: 0.12, ease: easeArray }}
          >
            <em>Tech</em>nologies
          </motion.span>
        </span>
      </Wordmark>

      <Container>
        <Bottom>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <LogoMark size={26} dark />© 2026 Social Technologies. All rights reserved.
          </span>
          <span>Founder Prabhu R · Developer Vigneshwaran V</span>
        </Bottom>
      </Container>
    </Wrap>
  );
}
