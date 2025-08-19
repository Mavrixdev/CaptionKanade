import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
const G_CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID

import { Analytics } from "@vercel/analytics/react"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={G_CLIENTID}>
      <App />
      <Analytics />
    </GoogleOAuthProvider>
  </StrictMode>
);
