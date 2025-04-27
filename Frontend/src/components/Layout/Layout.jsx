import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, ErrorBoundary } from '../';
import { LoadingSpinner } from '../';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Layout.module.css';

const Layout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.appContainer}>
      <Navbar />
      <main className={styles.mainContent}>
        <ErrorBoundary>
          <div className={styles.container}>
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default Layout;