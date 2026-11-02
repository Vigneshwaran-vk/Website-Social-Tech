import styled from 'styled-components';
import {
  Accent,
  ButtonLink,
  Container,
  Display,
  Eyebrow,
  H2,
  H3,
  Lead,
  Section,
} from '../components/ui';
import { LineReveal } from '../components/LineReveal';
import { ParallaxImage } from '../components/ParallaxImage';
import { Reveal } from '../components/Reveal';
import { ServiceGrid } from '../components/ServiceGrid';
import { SERVICES, SITE } from '../lib/content';
import { IMG } from '../lib/images';
import { usePageTitle } from '../lib/usePageTitle';

const Hero = styled.section`
  padding: clamp(84px, 9vw, 120px) 0 clamp(32px, 4vw, 56px);
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vw, 26px);
  align-items: flex-start;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: clamp(32px, 5vw, 64px);
  max-width: 760px;
`;

const Row = styled.div<{ $flip?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 6vw, 100px);
  align-items: center;

  & + & {
    margin-top: clamp(64px, 10vw, 150px);
  }

  > .photo {
    order: ${({ $flip }) => ($flip ? 2 : 1)};
  }
  > .text {
    order: ${({ $flip }) => ($flip ? 1 : 2)};
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    > .photo {
      order: 1;
    }
    > .text {
      order: 2;
    }
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;

  .num {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-size: clamp(56px, 7vw, 96px);
    line-height: 0.8;
    color: ${({ theme }) => theme.colors.blue};
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  li {
    display: flex;
    gap: 12px;
    align-items: baseline;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: -0.01em;
  }
  li::before {
    content: '';
    flex-shrink: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue};
    transform: translateY(-1px);
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(14px, 2vw, 28px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Mini = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  border-radius: 26px;
  padding: clamp(24px, 2.6vw, 36px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.6s ${({ theme }) => theme.ease}, background 0.4s;

  &:hover {
    transform: translateY(-8px);
    background: ${({ theme }) => theme.colors.blue};
  }
  .icon {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    display: grid;
    place-items: center;
    background: rgba(243, 245, 250, 0.12);
  }
  p {
    color: rgba(243, 245, 250, 0.72);
    font-size: 17px;
    line-height: 1.55;
  }
`;

const Icon = ({ children }: { children: React.ReactNode }) => (
  <span className="icon">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  </span>
);

const SECTIONS = [
  {
    n: '01',
    title: (
      <>
        L-commerce, <Accent>explained.</Accent>
      </>
    ),
    text: 'E-commerce put the whole world on one screen and left local shops behind. L-commerce starts where you are: your street, your city, your shops, with all the ease of online shopping.',
    points: ['Built around your city', 'Local shops first', 'Same convenience as online'],
    img: IMG.feat1,
    link: true,
  },
  {
    n: '02',
    title: (
      <>
        One retailer, <Accent>every platform.</Accent>
      </>
    ),
    text: 'Social Technologies works like a retailer and connects all of e-commerce. Instead of juggling many marketplaces, sellers get one place that brings them together.',
    points: ['One hub for many platforms', 'Works like a retailer', 'Less juggling for sellers'],
    img: IMG.feat2,
    link: false,
  },
  {
    n: '03',
    title: (
      <>
        Made for the phone <Accent>in your hand.</Accent>
      </>
    ),
    text: 'Most shoppers and shop owners live on their phones, so we design there first. Pages load fast, buttons are easy to reach, and nothing needs a manual.',
    points: ['Mobile first design', 'Fast, light pages', 'Easy for first-time users'],
    img: IMG.feat3,
    link: false,
  },
];

export default function Features() {
  usePageTitle('Features');

  return (
    <>
      <Hero>
        <Container>
          <HeroInner>
            <Eyebrow>Features</Eyebrow>
            <LineReveal
              as={Display}
              lines={[
                'Everything',
                <>
                  commerce <Accent>needs,</Accent>
                </>,
                'close to home.',
              ]}
            />
            <Reveal delay={0.55} y={24}>
              <Lead>
                The services we offer, the ideas behind them, and the details that make them work.
              </Lead>
            </Reveal>
          </HeroInner>
        </Container>
      </Hero>

      <Section style={{ paddingTop: 'clamp(32px, 5vw, 64px)' }}>
        <Container>
          <Head>
            <Eyebrow>Services</Eyebrow>
            <LineReveal
              as={H2}
              lines={[
                'What we',
                <>
                  <Accent>offer</Accent> you.
                </>,
              ]}
            />
          </Head>
          <ServiceGrid services={SERVICES} />
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          {SECTIONS.map((s, i) => (
            <Row key={s.n} $flip={i % 2 === 1}>
              <div className="photo">
                <ParallaxImage src={s.img} alt="" ratio="5 / 6" depth={10} />
              </div>
              <Text className="text">
                <Reveal>
                  <span className="num">{s.n}</span>
                </Reveal>
                <LineReveal as={H2} lines={[s.title]} />
                <Reveal delay={0.1}>
                  <Lead>{s.text}</Lead>
                </Reveal>
                <Reveal delay={0.2}>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </Reveal>
                {s.link && (
                  <Reveal delay={0.3}>
                    <ButtonLink href={SITE.icmUrl}>See it live on {SITE.icmLabel}</ButtonLink>
                  </Reveal>
                )}
              </Text>
            </Row>
          ))}
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Head>
            <Eyebrow>The small things</Eyebrow>
            <LineReveal
              as={H2}
              lines={[
                'Little details,',
                <>
                  <Accent>big</Accent> difference.
                </>,
              ]}
            />
          </Head>
          <Cards>
            <Reveal>
              <Mini>
                <Icon>
                  <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </Icon>
                <H3>Local first</H3>
                <p>Shops near you show up first, so buying local is the easy choice.</p>
              </Mini>
            </Reveal>
            <Reveal delay={0.1}>
              <Mini>
                <Icon>
                  <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                  <path d="M11 18.5h2" />
                </Icon>
                <H3>Mobile first</H3>
                <p>Designed on a phone screen, then scaled up for bigger ones.</p>
              </Mini>
            </Reveal>
            <Reveal delay={0.2}>
              <Mini>
                <Icon>
                  <path d="m5 12 4.5 4.5L19 7" />
                </Icon>
                <H3>Made simple</H3>
                <p>Clear steps and plain words, so anyone can sell or shop in minutes.</p>
              </Mini>
            </Reveal>
          </Cards>
        </Container>
      </Section>
    </>
  );
}
