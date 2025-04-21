import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { validateRoutes } from './utils/validateRoutes';

if (process.env.NODE_ENV === 'development') {
  const routeValidation = validateRoutes();
  if (!routeValidation.isValid) {
    console.error('Route validation errors:', routeValidation.errors);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

