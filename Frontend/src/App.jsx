import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ErrorBoundary from './components/ErrorBoundary';
import theme from './theme';
import Layout from './components/Layout';
import Routes from './routes';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <Layout>
                  <Routes />
                </Layout>
              </NotificationProvider>
            </AuthProvider>
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App; 