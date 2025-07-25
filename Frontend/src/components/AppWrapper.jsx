import React from 'react';
import { ToastProvider } from '../contexts/ToastContext';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import Layout from './Layout';
import Routes from '../routes';

// This component ensures proper provider hierarchy
const AppWrapper = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <NotificationProvider>
          <Layout>
            <Routes />
          </Layout>
        </NotificationProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default AppWrapper;
