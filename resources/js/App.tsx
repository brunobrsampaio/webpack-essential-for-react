import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Routes from '~/Routes';

const app = document.getElementById('app');

if (app) {
  const root = createRoot(app);

  root.render(
    <StrictMode>
      <Routes />
    </StrictMode>
  );
}
