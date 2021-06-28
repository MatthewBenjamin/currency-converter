import { hydrate } from 'react-dom';
import App from './components/app';
import React from 'react';

// TODO: consider render vs hydrate
hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.querySelector('#root')
);
