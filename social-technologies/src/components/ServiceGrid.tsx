import styled from 'styled-components';
import type { Service } from '../lib/content';
import { Reveal } from './Reveal';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(14px, 2vw, 28px);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  height: 100%;
  background: ${({ theme }) => theme.colors.card};
  border: 1.5px solid ${({ theme }) => theme.colors.line};
  border-radius: 26px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.6s ${({ theme }) => theme.ease}, border-color 0.3s,
    box-shadow 0.6s ${({ theme }) => theme.ease};

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.ink};
    box-shadow: 0 30px 50px -30px rgba(13, 13, 13, 0.35);
  }
`;

const Photo = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #e1e6f0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 1.1s ${({ theme }) => theme.ease};
  }
  ${Card}:hover & img {
    transform: scale(1.08);
  }
`;

const Tag = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.bg};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
`;

const Body = styled.div`
  padding: clamp(16px, 1.8vw, 22px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  h3 {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    font-size: clamp(17px, 1.6vw, 21px);
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 14px;
    line-height: 1.5;
  }
  span.n {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.blue};
    font-size: 1.05em;
  }
`;

/** Grid of service cards, each with a photo. */
export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <Grid>
      {services.map((s, i) => (
        <Reveal key={s.title} delay={(i % 3) * 0.1} y={50}>
          <Card>
            <Photo>
              <img src={s.img} alt={s.title} loading="lazy" />
              <Tag>{s.tag}</Tag>
            </Photo>
            <Body>
              <h3>
                {s.title}
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
              </h3>
              <p>{s.text}</p>
            </Body>
          </Card>
        </Reveal>
      ))}
    </Grid>
  );
}
