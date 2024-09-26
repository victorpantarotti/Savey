import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import GlobalStyle from './components/GlobalStyle/index.tsx';
import ContextProviders from './components/ContextProviders/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProviders>
      <>
        <GlobalStyle />
        <App />
      </>
    </ContextProviders>
  </StrictMode>,
);
