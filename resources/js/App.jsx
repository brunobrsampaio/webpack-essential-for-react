/**
 * Libs
 */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Routes
import Routes from '~/Routes';

const container = createRoot(document.getElementById('app'));

container.render(
  <StrictMode>
    <Routes />
  </StrictMode>,
);