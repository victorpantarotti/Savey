import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { PreferencesProvider } from './contexts/PreferencesContext.tsx';
import { VideosProvider } from './contexts/VideosContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreferencesProvider>
      <VideosProvider>
        <App />
      </VideosProvider>
    </PreferencesProvider>
  </StrictMode>,
);
