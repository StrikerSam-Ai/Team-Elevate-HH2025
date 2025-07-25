import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
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
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Layout>
                <Routes />
              </Layout>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App; 