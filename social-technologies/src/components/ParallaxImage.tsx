import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const Frame = styled.div<{ $ratio: string; $radius: number }>`
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border-radius: ${({ $radius }) => $radius}px;
  background: #e1e6f0;
`;

const Img = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
`;

interface ParallaxImageProps {
  src: string;
  alt: string;
  ratio?: string;
  radius?: number;
  /** How far the photo drifts, in % of its height (max ~12). */
  depth?: number;
}

/** Photo that drifts slower than the page, giving a slight depth effect. */
export function ParallaxImage({
  src,
  alt,
  ratio = '4 / 5',
  radius = 28,
  depth = 10,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${depth}%`, `${depth}%`]);

  return (
    <Frame ref={ref} $ratio={ratio} $radius={radius}>
      <Img src={src} alt={alt} loading="lazy" style={{ y, scale: 1 + (depth * 2.2) / 100 }} />
    </Frame>
  );
}
