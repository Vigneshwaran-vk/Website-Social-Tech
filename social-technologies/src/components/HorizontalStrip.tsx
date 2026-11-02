import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import type { StripItem } from '../lib/content';

const Outer = styled.section`
  position: relative;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(20px, 4vh, 44px);
  padding-top: 104px;
`;

const Head = styled.div`
  padding: 0 ${({ theme }) => theme.gutter};
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  margin: 0 auto;
`;

const Track = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: clamp(14px, 2vw, 28px);
  width: max-content;
  padding: 0 ${({ theme }) => theme.gutter};
  will-change: transform;
`;

const Slide = styled.figure<{ $i: number }>`
  margin: 0;
  position: relative;
  flex-shrink: 0;
  width: clamp(220px, 30vw, 420px);
  height: clamp(260px, 44vh, 500px);
  border-radius: 24px;
  overflow: hidden;
  background: #e1e6f0;
  transform: translateY(${({ $i }) => ($i % 2 === 0 ? '-3%' : '4%')});

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.2s ${({ theme }) => theme.ease};
  }
  &:hover img {
    transform: scale(1.06);
  }
  figcaption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 56px 18px 16px;
    color: #fff;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.62), transparent);
    font-weight: 800;
    letter-spacing: -0.02em;
    font-size: clamp(16px, 1.5vw, 20px);
    line-height: 1.15;
  }
  figcaption span {
    display: block;
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-weight: 400;
    font-size: 1.05em;
    opacity: 0.85;
  }
`;

const Bar = styled.div`
  margin: 0 auto;
  width: calc(100% - 2 * ${({ theme }) => theme.gutter});
  max-width: calc(${({ theme }) => theme.maxWidth} - 2 * ${({ theme }) => theme.gutter});
  height: 3px;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.line};
  overflow: hidden;
`;

const Fill = styled(motion.div)`
  height: 100%;
  width: 100%;
  transform-origin: 0 50%;
  background: ${({ theme }) => theme.colors.blue};
`;

/** Pinned photo strip that travels sideways while you scroll down. */
export function HorizontalStrip({ items, head }: { items: StripItem[]; head: ReactNode }) {
  const outerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDist(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <Outer ref={outerRef} style={{ height: `calc(100svh + ${dist}px)` }}>
      <Sticky>
        <Head>{head}</Head>
        <Track ref={trackRef} style={{ x }}>
          {items.map((it, i) => (
            <Slide key={it.label} $i={i}>
              <img src={it.src} alt={it.label} loading="lazy" draggable={false} />
              <figcaption>
                {it.label}
                <span>{it.sub}</span>
              </figcaption>
            </Slide>
          ))}
        </Track>
        <Bar>
          <Fill style={{ scaleX: scrollYProgress }} />
        </Bar>
      </Sticky>
    </Outer>
  );
}
