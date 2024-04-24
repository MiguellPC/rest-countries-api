import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './Root';

import './index.css';

import MainSection, {
  loader as MainSectionLoader,
} from './components/MainSection';
import Country from './components/Country';
import ErrorPage from './components/Error-page';
import { loader as countryLoader } from './components/Country';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<MainSection />} loader={MainSectionLoader} />
      <Route
        path="country/:code"
        element={<Country />}
        loader={countryLoader}
        errorElement={<ErrorPage />}
      />
    </Route>,
  ),
  { basename: '/rest-countries-api' },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
