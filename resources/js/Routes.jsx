import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: 'home' */'~/views/pages/Home'));

export default () => (
  <Suspense
    fallback={(
      <>
        Carregando...
      </>
    )}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={<Home/>}
        />
      </Routes>
    </BrowserRouter>
  </Suspense>
);