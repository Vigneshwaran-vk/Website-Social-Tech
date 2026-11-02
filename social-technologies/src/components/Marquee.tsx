import styled, { keyframes } from 'styled-components';
import { Accent } from './ui';

const slide = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`;

const Band = styled.div`
  overflow: hidden;
  border-block: 1.5px solid ${({ theme }) => theme.colors.ink};
  padding: clamp(12px, 1.8vw, 22px) 0;
  background: ${({ theme }) => theme.colors.bg};
`;

const Track = styled.div`
  display: flex;
  width: max-content;
`;

const Row = styled.div<{ $speed: number }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  animation: ${slide} ${({ $speed }) => $speed}s linear infinite;
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: clamp(16px, 2vw, 32px);
  padding-right: clamp(16px, 2vw, 32px);
  font-weight: 900;
  letter-spacing: -0.045em;
  font-size: clamp(24px, 3.8vw, 54px);
  line-height: 1;
  white-space: nowrap;
`;

const Star = styled.svg`
  flex-shrink: 0;
  width: 0.5em;
  height: 0.5em;
  color: ${({ theme }) => theme.colors.blue};
`;

/** Slowly scrolling banner of words. */
export function Marquee({ words, speed = 55 }: { words: string[]; speed?: number }) {
  const items = (hidden: boolean) => (
    <Row $speed={speed} aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <Item key={w}>
          {i % 2 === 1 ? <Accent>{w}</Accent> : w}
          <Star viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c.8 6.8 5.2 11.2 12 12-6.8.8-11.2 5.2-12 12-.8-6.8-5.2-11.2-12-12 6.8-.8 11.2-5.2 12-12Z" />
          </Star>
        </Item>
      ))}
    </Row>
  );

  return (
    <Band>
      <Track>
        {items(false)}
        {items(true)}
      </Track>
    </Band>
  );
}
