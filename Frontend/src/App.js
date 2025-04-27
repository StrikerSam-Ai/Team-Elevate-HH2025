import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ProtectedRoute } from './components/common';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import { Web3Provider } from './contexts/Web3Context';
import { PATHS } from './config/paths';
import {
  Home,
  Login,
  Register,
  Dashboard,
  Profile,
  Community,
  Journal,
  Events
} from './pages';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Web3Provider>
          <Layout>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Public routes */}
                <Route path={PATHS.HOME} element={<Home />} />
                <Route path={PATHS.LOGIN} element={<Login />} />
                <Route path={PATHS.REGISTER} element={<Register />} />
                
                {/* Protected routes */}
                <Route 
                  path={PATHS.DASHBOARD} 
                  element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
                />
                <Route 
                  path={PATHS.PROFILE} 
                  element={<ProtectedRoute><Profile /></ProtectedRoute>} 
                />
                <Route 
                  path={PATHS.COMMUNITY} 
                  element={<ProtectedRoute><Community /></ProtectedRoute>} 
                />
                <Route 
                  path={PATHS.JOURNAL} 
                  element={<ProtectedRoute><Journal /></ProtectedRoute>} 
                />
                <Route 
                  path={PATHS.EVENTS} 
                  element={<ProtectedRoute><Events /></ProtectedRoute>} 
                />
              </Routes>
            </React.Suspense>
          </Layout>
        </Web3Provider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;