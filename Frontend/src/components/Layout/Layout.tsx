import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1, py: 3 }}>
        <Container>
          {children || <Outlet />}
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;