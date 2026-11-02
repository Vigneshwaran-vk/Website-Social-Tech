import { IMG } from './images';

/** Draft copy — edit freely. */

export const SITE = {
  name: 'Social Technologies',
  icmUrl: 'https://indiancitymarket.com',
  icmLabel: 'Indiancitymarket.com',
  mainSite: 'https://www.socialtechnologies.in',
};

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/features', label: 'Features' },
  { to: '/contact', label: 'Contact' },
] as const;

export interface Service {
  title: string;
  text: string;
  img: string;
  tag: string;
}

export const SERVICES: Service[] = [
  {
    title: 'L-commerce platform',
    text: 'Local shops, streets and cities, online. The next version of e-commerce, built around where you live.',
    img: IMG.svc1,
    tag: 'Platform',
  },
  {
    title: 'Indian City Market',
    text: 'Our L-commerce website and app. Discover and buy from the shops in your own city.',
    img: IMG.svc2,
    tag: 'Website + app',
  },
  {
    title: 'Retail on every platform',
    text: 'We work like a retailer, selling across the major e-commerce platforms from one place.',
    img: IMG.svc3,
    tag: 'Retail',
  },
  {
    title: 'Marketplace connect',
    text: 'One hub that links marketplaces, sellers and buyers so everything stays joined up.',
    img: IMG.svc4,
    tag: 'Hub',
  },
  {
    title: 'Websites & apps',
    text: 'Fast, mobile-first websites and apps for shops and brands that want to be found.',
    img: IMG.svc5,
    tag: 'Build',
  },
  {
    title: 'Brand & design',
    text: 'Logos, posters and campaign visuals that make small businesses look big.',
    img: IMG.svc6,
    tag: 'Design',
  },
  {
    title: 'Seller onboarding',
    text: 'Simple steps to take a shop from the street to the screen, without the jargon.',
    img: IMG.svc7,
    tag: 'Sellers',
  },
  {
    title: 'Campaigns & offers',
    text: 'Seasonal sales and local campaigns that put small shops in the spotlight.',
    img: IMG.svc8,
    tag: 'Growth',
  },
];

export interface StripItem {
  src: string;
  label: string;
  sub: string;
}

export const STRIP: StripItem[] = [
  { src: IMG.strip1, label: 'Neighbourhood shops', sub: 'Where it starts' },
  { src: IMG.strip2, label: 'Street markets', sub: 'Full of life' },
  { src: IMG.strip3, label: 'Fresh & local', sub: 'Close to home' },
  { src: IMG.strip4, label: 'Made by hand', sub: 'Craft you can trust' },
  { src: IMG.strip5, label: 'Doorstep delivery', sub: 'From shelf to door' },
  { src: IMG.strip6, label: 'Small business', sub: 'Big city, big reach' },
];

export const MARQUEE_WORDS = [
  'E-commerce',
  'L-commerce',
  'Local shops',
  'One retailer',
  'Every platform',
  'Your city',
];

export const STEPS = [
  {
    n: '01',
    title: 'Start local',
    text: 'We begin with the shop, the street and the city, because that is where buyers actually live.',
  },
  {
    n: '02',
    title: 'Connect everything',
    text: 'We link marketplaces, platforms and sellers so there is one place that works like a retailer.',
  },
  {
    n: '03',
    title: 'Build in the open',
    text: 'Small releases, real feedback, and a website and app that keep getting better.',
  },
  {
    n: '04',
    title: 'Keep it simple',
    text: 'If a shop owner cannot use it on a phone in a minute, we go back and make it simpler.',
  },
];

export const TEAM = [
  {
    name: 'Prabhu R',
    role: 'Founder',
    text: 'Sets the direction. Took the idea of L-commerce and turned it into a company and a product.',
    initial: 'P',
    photo: '' as string, // add a photo URL to replace the monogram
  },
  {
    name: 'Vigneshwaran V',
    role: 'Developer',
    text: 'Builds the websites, apps and systems behind Social Technologies and Indian City Market.',
    initial: 'V',
    photo: '' as string,
  },
];

export const TOPICS = [
  'General question',
  'Sell with L-commerce',
  'Partnership',
  'Website or app',
  'Something else',
];
