import styled from 'styled-components';
import { ButtonLink, Accent, Container, Display, Eyebrow, H2, Lead, Section } from '../components/ui';
import { LineReveal } from '../components/LineReveal';
import { PhotoStack } from '../components/PhotoStack';
import { RotatingBadge } from '../components/RotatingBadge';
import { Marquee } from '../components/Marquee';
import { WordLight } from '../components/WordLight';
import { HorizontalStrip } from '../components/HorizontalStrip';
import { ServiceGrid } from '../components/ServiceGrid';
import { ParallaxImage } from '../components/ParallaxImage';
import { Reveal } from '../components/Reveal';
import { MARQUEE_WORDS, SERVICES, SITE, STRIP } from '../lib/content';
import { IMG } from '../lib/images';
import { usePageTitle } from '../lib/usePageTitle';

const Hero = styled.section`
  padding: clamp(120px, 14vw, 190px) 0 clamp(56px, 8vw, 110px);
  overflow: hidden;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: clamp(28px, 4vw, 64px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(22px, 3vw, 34px);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StackWrap = styled.div`
  position: relative;
  width: min(100%, 520px);
  justify-self: center;
  padding: 0 4%;

  @media (max-width: 900px) {
    padding: 0 10%;
  }
`;

const BadgePos = styled.div`
  position: absolute;
  left: -2%;
  bottom: 2%;
  z-index: 3;

  @media (max-width: 900px) {
    left: 0;
    bottom: -4%;
  }
`;

const Statement = styled(Section)`
  padding-bottom: clamp(48px, 7vw, 100px);
`;

const StripHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;

  h2 {
    max-width: 12ch;
  }
`;

const SectionHead = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: clamp(36px, 5vw, 72px);
  max-width: 800px;
`;

const Band = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(28px, 5vw, 80px);
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BandText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const CTA = styled.div`
  background: ${({ theme }) => theme.colors.blue};
  color: #fff;
  border-radius: clamp(26px, 4vw, 48px);
  padding: clamp(40px, 7vw, 100px) clamp(24px, 5vw, 80px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  overflow: hidden;

  em {
    color: #fff;
    opacity: 0.85;
  }
`;

export default function Home() {
  usePageTitle('');

  return (
    <>
      <Hero>
        <Container>
          <HeroGrid>
            <HeroText>
              <Eyebrow>Social Technologies · L-commerce</Eyebrow>
              <LineReveal
                as={Display}
                delay={0.15}
                lines={[
                  <span style={{ whiteSpace: 'nowrap' }}>E-commerce,</span>,
                  <>
                    rebuilt for <Accent>local</Accent>
                  </>,
                  'shops.',
                ]}
              />
              <Reveal delay={0.7} y={24}>
                <Lead>
                  Social Technologies connects all of e-commerce and works like a retailer. We
                  introduced L-commerce, the new version of e-commerce, and built{' '}
                  {SITE.icmLabel} to prove it.
                </Lead>
              </Reveal>
              <Reveal delay={0.85} y={24}>
                <Actions>
                  <ButtonLink to="/features">Explore features</ButtonLink>
                  <ButtonLink to="/contact" variant="ghost">
                    Talk to us
                  </ButtonLink>
                </Actions>
              </Reveal>
            </HeroText>

            <StackWrap>
              <PhotoStack
                chip="L-commerce"
                photos={[
                  { src: IMG.stack1, alt: 'A neighbourhood shopfront' },
                  { src: IMG.stack2, alt: 'A busy market day' },
                  { src: IMG.stack3, alt: 'A parcel being packed' },
                ]}
              />
              <BadgePos>
                <RotatingBadge size={148} />
              </BadgePos>
            </StackWrap>
          </HeroGrid>
        </Container>
      </Hero>

      <Marquee words={MARQUEE_WORDS} />

      <Statement>
        <Container>
          <WordLight text="Social Technologies is the main website that connects all of e-commerce and works like a retailer. We introduced *L-commerce*, the next version of e-commerce, where every local shop, street and city finally gets its place *online*." />
        </Container>
      </Statement>

      <HorizontalStrip
        items={STRIP}
        head={
          <StripHead>
            <div>
              <Eyebrow>Where it starts</Eyebrow>
              <LineReveal
                as={H2}
                lines={[
                  <>
                    Shops, streets, <Accent>cities.</Accent>
                  </>,
                ]}
              />
            </div>
            <Lead style={{ maxWidth: '34ch' }}>
              Keep scrolling. Every photo is a place L-commerce is built for.
            </Lead>
          </StripHead>
        }
      />

      <Section>
        <Container>
          <SectionHead>
            <Eyebrow>What we do</Eyebrow>
            <LineReveal
              as={H2}
              lines={[
                'One hub for',
                <>
                  every <Accent>kind</Accent> of
                </>,
                'commerce.',
              ]}
            />
            <Reveal delay={0.2}>
              <Lead>From the platform itself to the websites, apps and brands around it.</Lead>
            </Reveal>
          </SectionHead>
          <ServiceGrid services={SERVICES.slice(0, 6)} />
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Band>
            <ParallaxImage src={IMG.band} alt="A city seen from above" ratio="5 / 6" depth={11} />
            <BandText>
              <Eyebrow>Proof it works</Eyebrow>
              <LineReveal
                as={H2}
                lines={[
                  'Meet',
                  <>
                    <Accent>Indian</Accent> City
                  </>,
                  'Market.',
                ]}
              />
              <Reveal delay={0.15}>
                <Lead>
                  {SITE.icmLabel} is our L-commerce website and app. It shows what happens when
                  buying and selling start from the city you live in instead of a warehouse far
                  away.
                </Lead>
              </Reveal>
              <Reveal delay={0.3}>
                <ButtonLink href={SITE.icmUrl}>Visit {SITE.icmLabel}</ButtonLink>
              </Reveal>
            </BandText>
          </Band>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          <Reveal>
            <CTA>
              <Eyebrow style={{ color: '#fff' }}>Work with us</Eyebrow>
              <H2>
                Got a shop, a platform or an <Accent>idea?</Accent>
              </H2>
              <ButtonLink to="/contact" variant="light">
                Send us a message
              </ButtonLink>
            </CTA>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
