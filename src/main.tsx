import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import ContextProviders from './components/ContextProviders/index.tsx';

import "./index.scss";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProviders>
      <App />
    </ContextProviders>
  </StrictMode>,
);
