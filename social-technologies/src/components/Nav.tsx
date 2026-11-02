import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { NAV_LINKS } from '../lib/content';
import { getLenis } from '../lib/lenis';
import { easeArray } from '../styles/theme';
import { Logo } from './Logo';

/* Floating glass pill, centred links, black call-to-action */

const Bar = styled.header`
  position: fixed;
  top: 14px;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 ${({ theme }) => theme.gutter};
  pointer-events: none;
`;

const Inner = styled.div`
  pointer-events: auto;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding: 10px 12px 10px 22px;
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.ui};

  /* the glass */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.42));
  backdrop-filter: blur(24px) saturate(1.8);
  -webkit-backdrop-filter: blur(24px) saturate(1.8);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(255, 255, 255, 0.35),
    0 14px 40px -14px rgba(25, 40, 90, 0.25), 0 2px 8px rgba(25, 40, 90, 0.06);

  @media (max-width: 860px) {
    grid-template-columns: 1fr auto;
    padding: 8px 8px 8px 16px;
  }
`;

const Left = styled.div`
  justify-self: start;
`;

const Links = styled.nav`
  display: flex;
  gap: 4px;

  @media (max-width: 860px) {
    display: none;
  }
`;

const Item = styled(NavLink)`
  padding: 13px 22px;
  border-radius: 999px;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: -0.01em;
  color: #373c4a;
  transition: background 0.35s, color 0.35s;

  &:hover {
    background: rgba(11, 13, 18, 0.07);
    color: ${({ theme }) => theme.colors.ink};
  }
  &.active {
    background: ${({ theme }) => theme.colors.ink};
    color: #fff;
  }
`;

const Cta = styled(Link)`
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 16px 26px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.ink};
  color: #fff;
  font-weight: 600;
  font-size: 17px;
  letter-spacing: -0.015em;
  transition: background 0.35s, transform 0.4s ${({ theme }) => theme.ease};

  svg {
    transition: transform 0.4s ${({ theme }) => theme.ease};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
    transform: translateY(-1px);
  }
  &:hover svg {
    transform: translate(2px, -2px);
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

const Burger = styled.button<{ $open: boolean }>`
  display: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: ${({ theme }) => theme.colors.ink};
  color: #fff;
  position: relative;

  span {
    position: absolute;
    left: 15px;
    right: 15px;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: transform 0.4s ${({ theme }) => theme.ease}, top 0.4s ${({ theme }) => theme.ease};
  }
  span:first-child {
    top: ${({ $open }) => ($open ? '23px' : '18px')};
    transform: rotate(${({ $open }) => ($open ? '45deg' : '0')});
  }
  span:last-child {
    top: ${({ $open }) => ($open ? '23px' : '28px')};
    transform: rotate(${({ $open }) => ($open ? '-45deg' : '0')});
  }

  @media (max-width: 860px) {
    display: block;
  }
`;

/* sits BELOW the bar so the burger can always close it */
const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: ${({ theme }) => theme.colors.bg};
  padding: 120px ${({ theme }) => theme.gutter} 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  overflow-y: auto;
`;

const MobileLink = styled(NavLink)`
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 8px 0;
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1;
  font-size: clamp(48px, 15vw, 84px);

  small {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-weight: 400;
    font-size: 0.32em;
    letter-spacing: 0;
    color: ${({ theme }) => theme.colors.blue};
  }
  &.active {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

const MobileCta = styled(Cta)`
  display: inline-flex;
  justify-self: start;
  align-self: flex-start;
`;

const ArrowUpRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3.5 12.5 12.5 3.5M5 3.5h7.5V11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  // freeze page scrolling while the phone menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <Bar>
        <Inner>
          <Left>
            <Logo />
          </Left>
          <Links aria-label="Main">
            {NAV_LINKS.map((l) => (
              <Item key={l.to} to={l.to} end={l.to === '/'}>
                {l.label}
              </Item>
            ))}
          </Links>
          <Cta to="/contact">
            Start a project
            <ArrowUpRight />
          </Cta>
          <Burger
            $open={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </Burger>
        </Inner>
      </Bar>

      <AnimatePresence>
        {open && (
          <Overlay
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: easeArray }}
          >
            <nav aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: easeArray }}
                >
                  <MobileLink to={l.to} end={l.to === '/'}>
                    {l.label}
                    <small>0{i + 1}</small>
                  </MobileLink>
                </motion.div>
              ))}
            </nav>
            <MobileCta to="/contact">
              Start a project
              <ArrowUpRight />
            </MobileCta>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
