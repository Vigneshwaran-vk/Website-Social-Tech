import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

export interface StackPhoto {
  src: string;
  alt: string;
}

const float = keyframes`
  0%, 100% { transform: translateY(-7px); }
  50% { transform: translateY(7px); }
`;

const Scene = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.08;
  perspective: 1400px;
  touch-action: pan-y;
`;

const Tilt = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
`;

const Card = styled.div`
  position: absolute;
  left: 19%;
  top: 8%;
  width: 62%;
  aspect-ratio: 4 / 5;
  transform-style: preserve-3d;
`;

const Floater = styled.div<{ $delay: number }>`
  width: 100%;
  height: 100%;
  border-radius: 26px;
  overflow: hidden;
  background: #e1e6f0;
  box-shadow: 0 40px 70px -28px rgba(13, 13, 13, 0.45), 0 0 0 6px #ffffff;
  animation: ${float} 7s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Chip = styled.div`
  position: absolute;
  right: 4%;
  top: 7%;
  padding: 10px 18px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  font-weight: 800;
  font-size: 14px;
  letter-spacing: -0.01em;
  transform: translateZ(190px) rotate(5deg);
  box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.4);

  em {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-weight: 400;
    font-size: 1.15em;
    color: #8fa6ff;
  }
`;

const LAYOUT = [
  { x: '-26%', y: '6%', r: -9, z: 0 },
  { x: '24%', y: '-6%', r: 7, z: 70 },
  { x: '0%', y: '30%', r: -2, z: 140 },
];

/** Three photos in 3D that tilt toward the pointer (and sway on their own). */
export function PhotoStack({ photos, chip }: { photos: StackPhoto[]; chip?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), {
    stiffness: 110,
    damping: 16,
  });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), {
    stiffness: 110,
    damping: 16,
  });

  // Gentle idle sway so it feels alive on phones, where there is no hover.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const tick = (t: number) => {
      if (!hovering.current) {
        mx.set(Math.sin(t / 2300) * 0.3);
        my.set(Math.cos(t / 2900) * 0.22);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mx, my]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    hovering.current = true;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    hovering.current = false;
  };

  return (
    <Scene ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} onPointerUp={onLeave}>
      <Tilt style={{ rotateX, rotateY }}>
        {photos.slice(0, 3).map((p, i) => {
          const l = LAYOUT[i];
          return (
            <Card
              key={p.src}
              style={{ transform: `translate3d(${l.x}, ${l.y}, ${l.z}px) rotate(${l.r}deg)` }}
            >
              <Floater $delay={i * -2.2}>
                <img src={p.src} alt={p.alt} loading={i === 2 ? 'eager' : 'lazy'} />
              </Floater>
            </Card>
          );
        })}
        {chip && (
          <Chip>
            <em>{chip}</em>
          </Chip>
        )}
      </Tilt>
    </Scene>
  );
}
