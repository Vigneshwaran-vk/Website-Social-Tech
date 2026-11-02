export const theme = {
  colors: {
    bg: '#f3f5fa',
    card: '#ffffff',
    soft: '#e4e9f3',
    ink: '#0b0d12',
    muted: '#596075',
    blue: '#2b5cff',
    line: 'rgba(11, 13, 18, 0.12)',
    dark: '#0b0d12',
    darkText: '#f3f5fa',
    darkMuted: 'rgba(243, 245, 250, 0.55)',
  },
  fonts: {
    heading: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
    serif: "'Instrument Serif', Georgia, 'Times New Roman', serif",
    ui: "'Plus Jakarta Sans', 'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
  },
  ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
  maxWidth: '1320px',
  gutter: 'clamp(16px, 4vw, 56px)',
} as const;

export type AppTheme = typeof theme;

export const easeArray: [number, number, number, number] = [0.22, 1, 0.36, 1];
