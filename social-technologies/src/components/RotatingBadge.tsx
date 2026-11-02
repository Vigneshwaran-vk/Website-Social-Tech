import { useId } from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrap = styled.div<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bg};
  box-shadow: 0 18px 40px -16px rgba(13, 13, 13, 0.35);
`;

const Ring = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: ${spin} 18s linear infinite;

  text {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 800;
    font-size: 15.5px;
    letter-spacing: 0.12em;
    fill: ${({ theme }) => theme.colors.ink};
  }
`;

const Center = styled.div`
  position: absolute;
  inset: 31%;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.blue};
  color: #fff;
  display: grid;
  place-items: center;
`;

/** Circular text badge that turns slowly. */
export function RotatingBadge({
  size = 150,
  text = 'L-COMMERCE • SHOP YOUR CITY • LOCAL TO GLOBAL • ',
}: {
  size?: number;
  text?: string;
}) {
  const id = `badge-${useId().replace(/:/g, '')}`;
  return (
    <Wrap $size={size} aria-hidden="true">
      <Ring viewBox="0 0 200 200">
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="470" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </Ring>
      <Center>
        <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
          <path
            d="M4 14 14 4M6 4h8v8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Center>
    </Wrap>
  );
}
