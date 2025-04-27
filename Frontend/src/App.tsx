import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { ProtectedRoute } from './components/common';
import { 
  AuthProvider, 
  ToastProvider,
  Web3Provider,
  AccessibilityProvider 
} from './contexts';
import { PATHS } from './config/paths';
import {
  Home,
  Login,
  Register,
  Dashboard,
  Profile,
  Community,
  Journal,
  Events,
  Resources,
  FamilyConnection,
  Analytics
} from './pages';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Web3Provider>
          <AccessibilityProvider>
            <Layout>
              <Suspense fallback={
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading...</p>
                </div>
              }>
                <Routes>
                  {/* Public routes */}
                  <Route path={PATHS.HOME} element={<Home />} />
                  <Route path={PATHS.LOGIN} element={<Login />} />
                  <Route path={PATHS.REGISTER} element={<Register />} />
                  
                  {/* Protected routes */}
                  <Route path={PATHS.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path={PATHS.PROFILE} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path={PATHS.COMMUNITY} element={<ProtectedRoute><Community /></ProtectedRoute>} />
                  <Route path={PATHS.JOURNAL} element={<ProtectedRoute><Journal /></ProtectedRoute>} />
                  <Route path={PATHS.EVENTS} element={<ProtectedRoute><Events /></ProtectedRoute>} />
                  <Route path={PATHS.RESOURCES} element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                  <Route path={PATHS.FAMILY_CONNECTION} element={<ProtectedRoute><FamilyConnection /></ProtectedRoute>} />
                  <Route path={PATHS.ANALYTICS} element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                  
                  {/* Catch-all route - 404 */}
                  <Route path="*" element={
                    <div className="not-found-container">
                      <h1>404 - Page Not Found</h1>
                      <p>The page you are looking for does not exist.</p>
                    </div>
                  } />
                </Routes>
              </Suspense>
            </Layout>
          </AccessibilityProvider>
        </Web3Provider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;