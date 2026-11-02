/**
 * All photos live here so they are easy to swap.
 *
 * They are loaded from picsum.photos (a free random-photo service) as
 * stand-ins. Replace any URL below with your own picture, e.g. a file you put
 * in /public/photos/  ->  '/photos/market.jpg'
 */
export const photo = (seed: string, w = 1200, h = 1500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const IMG = {
  // hero stack
  stack1: photo('st-shopfront', 900, 1100),
  stack2: photo('st-market-day', 900, 1100),
  stack3: photo('st-parcel-pack', 900, 1100),

  // horizontal strip
  strip1: photo('st-neighbourhood', 900, 1200),
  strip2: photo('st-street-market', 900, 1200),
  strip3: photo('st-fresh-local', 900, 1200),
  strip4: photo('st-handmade', 900, 1200),
  strip5: photo('st-delivery', 900, 1200),
  strip6: photo('st-small-business', 900, 1200),

  // service cards
  svc1: photo('st-svc-lcommerce', 900, 700),
  svc2: photo('st-svc-citymarket', 900, 700),
  svc3: photo('st-svc-retail', 900, 700),
  svc4: photo('st-svc-connect', 900, 700),
  svc5: photo('st-svc-apps', 900, 700),
  svc6: photo('st-svc-brand', 900, 700),
  svc7: photo('st-svc-onboard', 900, 700),
  svc8: photo('st-svc-campaign', 900, 700),

  // wide / feature photos
  band: photo('st-city-wide', 1800, 1100),
  feat1: photo('st-feature-local', 1100, 1300),
  feat2: photo('st-feature-retailer', 1100, 1300),
  feat3: photo('st-feature-mobile', 1100, 1300),

  // about
  story: photo('st-story-founding', 1200, 1500),
  storyWide: photo('st-story-wide', 1800, 1000),
  contact: photo('st-contact-hello', 1000, 1200),
} as const;
