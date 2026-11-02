import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import type { ReactNode } from 'react';

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.gutter};
`;

export const Section = styled.section`
  position: relative;
  padding: clamp(72px, 11vw, 160px) 0;
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue};
  }
`;

export const Display = styled.h1`
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 0.96;
  font-size: clamp(44px, 7.4vw, 120px);
`;

export const H2 = styled.h2`
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  font-size: clamp(36px, 5.8vw, 88px);
`;

export const H3 = styled.h3`
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  font-size: clamp(22px, 2.2vw, 30px);
`;

/** Italic serif accent used inside headlines. */
export const Accent = styled.em`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.02em;
  font-size: 1.06em;
  color: ${({ theme }) => theme.colors.blue};
`;

export const Lead = styled.p`
  font-size: clamp(17px, 1.5vw, 21px);
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 54ch;
`;

/* ---------- Buttons ---------- */

type Variant = 'solid' | 'ghost' | 'light';

const buttonStyle = css<{ $variant: Variant }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 26px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: -0.01em;
  border: 1.5px solid transparent;
  transition: transform 0.4s ${({ theme }) => theme.ease}, background 0.3s, color 0.3s,
    border-color 0.3s;
  will-change: transform;

  svg {
    transition: transform 0.4s ${({ theme }) => theme.ease};
  }
  &:hover svg {
    transform: translateX(4px) rotate(-45deg);
  }
  &:hover {
    transform: translateY(-2px);
  }

  ${({ $variant, theme }) =>
    $variant === 'solid' &&
    css`
      background: ${theme.colors.ink};
      color: #fff;
      &:hover {
        background: ${theme.colors.blue};
      }
    `}
  ${({ $variant, theme }) =>
    $variant === 'ghost' &&
    css`
      border-color: ${theme.colors.ink};
      color: ${theme.colors.ink};
      &:hover {
        background: ${theme.colors.ink};
        color: ${theme.colors.bg};
      }
    `}
  ${({ $variant, theme }) =>
    $variant === 'light' &&
    css`
      background: ${theme.colors.bg};
      color: ${theme.colors.ink};
      &:hover {
        background: ${theme.colors.blue};
        color: #fff;
      }
    `}
`;

const RouterButton = styled(Link)<{ $variant: Variant }>`
  ${buttonStyle}
`;
const AnchorButton = styled.a<{ $variant: Variant }>`
  ${buttonStyle}
`;
export const SubmitButton = styled.button<{ $variant: Variant }>`
  ${buttonStyle}
  border: 1.5px solid transparent;
  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M3 9h11M10 4.5 14.5 9 10 13.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface ButtonLinkProps {
  to?: string;
  href?: string;
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({ to, href, variant = 'solid', children }: ButtonLinkProps) {
  if (to) {
    return (
      <RouterButton to={to} $variant={variant}>
        {children}
        <Arrow />
      </RouterButton>
    );
  }
  return (
    <AnchorButton href={href} target="_blank" rel="noopener noreferrer" $variant={variant}>
      {children}
      <Arrow />
    </AnchorButton>
  );
}
