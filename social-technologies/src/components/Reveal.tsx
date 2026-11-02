import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { easeArray } from '../styles/theme';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

/** Fades and floats its children up when they scroll into view. */
export function Reveal({ children, delay = 0, y = 44, className, style }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.95, delay, ease: easeArray }}
    >
      {children}
    </motion.div>
  );
}
