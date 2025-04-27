import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ErrorBoundary } from '../common';
import { useAuth } from '../../contexts/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { loading } = useAuth() || { loading: false };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <div className="container">
          <ErrorBoundary>
            {children || <Outlet />}
          </ErrorBoundary>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;