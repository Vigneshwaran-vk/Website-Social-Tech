import { createGlobalStyle } from 'styled-components';

// Fine film-grain: an SVG turbulence filter used as a tiled background.
const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 500;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Soft cool-blue washes behind the page (gives the glass nav something to blur) */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(60vw 55vh at 92% -8%, rgba(110, 150, 255, 0.30), transparent 62%),
      radial-gradient(55vw 50vh at -6% 28%, rgba(170, 195, 255, 0.34), transparent 62%),
      radial-gradient(50vw 45vh at 70% 105%, rgba(150, 190, 255, 0.22), transparent 60%);
  }

  /* Grain overlay sits above everything but never blocks clicks */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    background-image: ${grain};
    opacity: 0.05;
    mix-blend-mode: multiply;
  }

  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; color: inherit; cursor: pointer; }
  h1, h2, h3, h4, p { margin: 0; }
  ul { margin: 0; padding: 0; list-style: none; }

  ::selection { background: ${({ theme }) => theme.colors.blue}; color: #fff; }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.blue};
    outline-offset: 3px;
  }

  /* Lenis (momentum scrolling) */
  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }
  .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
  .lenis.lenis-stopped { overflow: hidden; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`;
