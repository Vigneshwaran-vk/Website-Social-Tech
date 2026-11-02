import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { theme } from './styles/theme';

// The single-file preview build has no server, so it uses #/routes.
const Router = import.meta.env.VITE_PREVIEW ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MotionConfig reducedMotion="user">
        <Router>
          <App />
        </Router>
      </MotionConfig>
    </ThemeProvider>
  </React.StrictMode>,
);
