import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { easeArray } from '../styles/theme';

const Mask = styled.span`
  display: block;
  overflow: hidden;
  /* room for descenders and the italic serif accent */
  padding: 0.08em 0.06em 0.14em;
  margin: -0.08em -0.06em -0.14em;
`;

interface LineRevealProps {
  lines: ReactNode[];
  as: React.ElementType;
  delay?: number;
  className?: string;
}

/** Headline whose lines slide up one after another. */
export function LineReveal({ lines, as: Tag, delay = 0.1, className }: LineRevealProps) {
  // Watch the outer heading, not the masked lines: a line parked below its
  // mask is clipped, so it would never count as "in view".
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <Mask key={i}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ y: '115%' }}
            animate={{ y: inView ? '0%' : '115%' }}
            transition={{ duration: 1.1, delay: delay + i * 0.13, ease: easeArray }}
          >
            {line}
          </motion.span>
        </Mask>
      ))}
    </Tag>
  );
}
