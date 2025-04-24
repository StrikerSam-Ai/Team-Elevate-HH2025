import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, ToastProvider, Web3Provider } from './contexts';
import { Layout, ProtectedRoute } from './components';
import { PATHS } from './config/paths';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Community = React.lazy(() => import('./pages/Community'));
const Journal = React.lazy(() => import('./pages/Journal'));
const Events = React.lazy(() => import('./pages/Events'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Web3Provider>
          <div className="App">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path={PATHS.HOME} element={<Home />} />
                  <Route path={PATHS.LOGIN} element={<Login />} />
                  <Route path={PATHS.REGISTER} element={<Register />} />
                  <Route path={PATHS.DASHBOARD} element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path={PATHS.PROFILE} element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path={PATHS.COMMUNITY} element={
                    <ProtectedRoute>
                      <Community />
                    </ProtectedRoute>
                  } />
                  <Route path={PATHS.JOURNAL} element={
                    <ProtectedRoute>
                      <Journal />
                    </ProtectedRoute>
                  } />
                  <Route path={PATHS.EVENTS} element={
                    <ProtectedRoute>
                      <Events />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </React.Suspense>
          </div>
        </Web3Provider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;