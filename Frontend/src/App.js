import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { PATHS } from './config/paths';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Community = React.lazy(() => import('./pages/Community'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.REGISTER} element={<Register />} />
            <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
            <Route path={PATHS.PROFILE} element={<Profile />} />
            <Route path={PATHS.COMMUNITY} element={<Community />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;