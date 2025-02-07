import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import Widget from './widget';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Widget callback={(token) => alert(`token: ${token}`)} url="https://sandbox-api.3thix.com" />
  </StrictMode>
);
