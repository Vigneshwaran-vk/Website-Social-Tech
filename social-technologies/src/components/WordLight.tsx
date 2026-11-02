import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import styled from 'styled-components';

const P = styled.p`
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.12;
  font-size: clamp(28px, 4.6vw, 68px);
  max-width: 22em;

  em {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    font-style: italic;
    font-size: 1.06em;
    color: ${({ theme }) => theme.colors.blue};
    letter-spacing: -0.02em;
  }
`;

function Word({
  progress,
  start,
  end,
  accent,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  accent: boolean;
  children: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const inner = accent ? <em>{children}</em> : children;
  return (
    <>
      <motion.span style={{ opacity, display: 'inline-block' }}>{inner}</motion.span>{' '}
    </>
  );
}

/** Paragraph whose words light up one by one as you scroll. Wrap a word in *stars* for the serif accent. */
export function WordLight({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] });
  const words = text.split(' ');
  const n = words.length;

  return (
    <P ref={ref}>
      {words.map((raw, i) => {
        const m = raw.match(/^\*(.+?)\*([.,;:!?]*)$/);
        const word = m ? m[1] + m[2] : raw;
        return (
          <Word
            key={`${raw}-${i}`}
            progress={scrollYProgress}
            start={i / n}
            end={Math.min(1, (i + 1.6) / n)}
            accent={Boolean(m)}
          >
            {word}
          </Word>
        );
      })}
    </P>
  );
}
