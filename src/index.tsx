import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import Widget from './widget';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Widget
      callback={(token) => alert(`token: ${token}`)}
      url="https://api.3thix.com"
      // style={{ LinkColor: '#ffffff', ButtonBackground: 'red', InputBackground: 'white', InputTextColor: 'red' }}
    />
  </StrictMode>
);
