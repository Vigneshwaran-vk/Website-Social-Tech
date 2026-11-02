import { Link } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Mark: two points joined by a line — a shop and a buyer, connected.
 * White node at the start, blue node at the end.
 */
export function LogoMark({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  const fg = dark ? '#0b0d12' : '#ffffff';
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="17" fill={dark ? '#f3f5fa' : '#0b0d12'} />
      <path d="M23 41 41 23" stroke={fg} strokeWidth="6" strokeLinecap="round" />
      <circle cx="22" cy="42" r="7.5" fill={fg} />
      <circle cx="42" cy="22" r="7.5" fill="#2b7bff" />
    </svg>
  );
}

const Wrap = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
`;

const Text = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 22px;
  line-height: 1;

  em {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-weight: 400;
    letter-spacing: -0.02em;
    font-size: 25px;
  }

  @media (max-width: 420px) {
    font-size: 19px;
    em {
      font-size: 22px;
    }
  }
`;

export function Logo() {
  return (
    <Wrap to="/" aria-label="Social Technologies — home">
      <LogoMark size={44} />
      <Text>
        Social
        <em>Technologies</em>
      </Text>
    </Wrap>
  );
}
