import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, ErrorBoundary } from '../';
import { LoadingSpinner } from '../';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Layout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <ErrorBoundary>
          <div className="container">
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;