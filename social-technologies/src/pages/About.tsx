import styled from 'styled-components';
import { Accent, Container, Display, Eyebrow, H2, H3, Lead, Section } from '../components/ui';
import { LineReveal } from '../components/LineReveal';
import { ParallaxImage } from '../components/ParallaxImage';
import { Reveal } from '../components/Reveal';
import { WordLight } from '../components/WordLight';
import { STEPS, TEAM } from '../lib/content';
import { IMG } from '../lib/images';
import { usePageTitle } from '../lib/usePageTitle';

const Hero = styled.section`
  padding: clamp(84px, 9vw, 120px) 0 clamp(32px, 4vw, 60px);
`;

const HeroInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2.5vw, 26px);
  align-items: flex-start;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(28px, 6vw, 96px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const StickyPhoto = styled.div`
  position: sticky;
  top: 76px;

  @media (max-width: 900px) {
    position: static;
  }
`;

const StoryText = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(22px, 3vw, 36px);

  p.body {
    font-size: clamp(18px, 1.6vw, 22px);
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.muted};
  }
  p.body strong {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

const Quote = styled.blockquote`
  margin: 0;
  padding-left: 22px;
  border-left: 4px solid ${({ theme }) => theme.colors.blue};
  font-family: ${({ theme }) => theme.fonts.serif};
  font-style: italic;
  font-size: clamp(28px, 3.4vw, 46px);
  line-height: 1.12;
  letter-spacing: -0.015em;
`;

const Steps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(14px, 2vw, 28px);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Step = styled.li`
  height: 100%;
  background: ${({ theme }) => theme.colors.card};
  border: 1.5px solid ${({ theme }) => theme.colors.line};
  border-radius: 26px;
  padding: clamp(24px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.6s ${({ theme }) => theme.ease}, border-color 0.3s;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.colors.ink};
  }
  .n {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-size: clamp(44px, 5vw, 68px);
    line-height: 1;
    color: ${({ theme }) => theme.colors.blue};
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 17px;
    line-height: 1.55;
  }
`;

const Team = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: clamp(14px, 2vw, 28px);

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Person = styled.article`
  height: 100%;
  background: ${({ theme }) => theme.colors.card};
  border: 1.5px solid ${({ theme }) => theme.colors.line};
  border-radius: 28px;
  overflow: hidden;
  transition: transform 0.6s ${({ theme }) => theme.ease}, border-color 0.3s;

  &:hover {
    transform: translateY(-8px) rotate(-0.6deg);
    border-color: ${({ theme }) => theme.colors.ink};
  }
`;

const Portrait = styled.div`
  position: relative;
  aspect-ratio: 5 / 4;
  background: ${({ theme }) => theme.colors.ink};
  color: ${({ theme }) => theme.colors.bg};
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .initial {
    font-weight: 900;
    font-size: clamp(120px, 18vw, 220px);
    letter-spacing: -0.06em;
    line-height: 1;
    transition: transform 0.9s ${({ theme }) => theme.ease};
  }
  ${Person}:hover & .initial {
    transform: scale(1.1) rotate(-4deg);
  }
  &::after {
    content: '';
    position: absolute;
    right: 8%;
    bottom: 10%;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue};
  }
`;

const PersonBody = styled.div`
  padding: clamp(22px, 2.4vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 10px;

  .role {
    font-family: ${({ theme }) => theme.fonts.serif};
    font-style: italic;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.blue};
    line-height: 1;
  }
  p {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 17px;
    line-height: 1.55;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: clamp(32px, 5vw, 64px);
  max-width: 760px;
`;

export default function About() {
  usePageTitle('About');

  return (
    <>
      <Hero>
        <Container>
          <HeroInner>
            <Eyebrow>About us</Eyebrow>
            <LineReveal
              as={Display}
              lines={[
                'Two people,',
                <>
                  one <Accent>big</Accent> idea.
                </>,
              ]}
            />
            <Reveal delay={0.5} y={24}>
              <Lead>
                Social Technologies is the main website that connects all of e-commerce and works
                like a retailer. This is how it started and how we work.
              </Lead>
            </Reveal>
          </HeroInner>
        </Container>
      </Hero>

      <Section style={{ paddingTop: 'clamp(32px, 5vw, 64px)' }}>
        <Container>
          <StoryGrid>
            <StickyPhoto>
              <ParallaxImage src={IMG.story} alt="Where the story began" ratio="4 / 5" depth={9} />
            </StickyPhoto>
            <StoryText>
              <Reveal>
                <Eyebrow>Our founding story</Eyebrow>
              </Reveal>
              <LineReveal
                as={H2}
                lines={[
                  'Shopping online',
                  <>
                    forgot the <Accent>neighbourhood.</Accent>
                  </>,
                ]}
              />
              <Reveal>
                <p className="body">
                  E-commerce put the whole world on one screen, and somewhere along the way the
                  shop around the corner got left out. Prabhu R saw it clearly:{' '}
                  <strong>
                    the people who keep a city running were the ones hardest to find online.
                  </strong>
                </p>
              </Reveal>
              <Reveal>
                <Quote>So we gave commerce a new starting point: where you live.</Quote>
              </Reveal>
              <Reveal>
                <p className="body">
                  That idea became <strong>L-commerce</strong>, the new version of e-commerce, and
                  Social Technologies became the place that connects it all. Together with
                  developer Vigneshwaran V, the idea turned into{' '}
                  <strong>Indiancitymarket.com</strong>, a website and app where cities shop from
                  their own shops.
                </p>
              </Reveal>
            </StoryText>
          </StoryGrid>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <WordLight text="We are not trying to replace the shop on your street. We are trying to *bring it online*, so it can sell like the biggest names and still feel like *yours*." />
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Head>
            <Eyebrow>How we work</Eyebrow>
            <LineReveal
              as={H2}
              lines={[
                'Four habits,',
                <>
                  <Accent>no</Accent> shortcuts.
                </>,
              ]}
            />
          </Head>
          <Steps>
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={(i % 2) * 0.1}>
                <Step>
                  <span className="n">{s.n}</span>
                  <H3>{s.title}</H3>
                  <p>{s.text}</p>
                </Step>
              </Reveal>
            ))}
          </Steps>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Head>
            <Eyebrow>The team</Eyebrow>
            <LineReveal
              as={H2}
              lines={[
                'The people',
                <>
                  behind the <Accent>screen.</Accent>
                </>,
              ]}
            />
          </Head>
          <Team>
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12}>
                <Person>
                  <Portrait>
                    {p.photo ? (
                      <img src={p.photo} alt={p.name} loading="lazy" />
                    ) : (
                      <span className="initial" aria-hidden="true">
                        {p.initial}
                      </span>
                    )}
                  </Portrait>
                  <PersonBody>
                    <H3>{p.name}</H3>
                    <span className="role">{p.role}</span>
                    <p>{p.text}</p>
                  </PersonBody>
                </Person>
              </Reveal>
            ))}
          </Team>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <ParallaxImage src={IMG.storyWide} alt="A city at work" ratio="21 / 9" radius={32} depth={11} />
        </Container>
      </Section>
    </>
  );
}
