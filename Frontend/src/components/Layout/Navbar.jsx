import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.navBrand}>
          ElderHub
        </Link>
        <div className={styles.navLinks}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`${styles.navLink} ${location.pathname === '/dashboard' ? styles.active : ''}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/community" 
                className={`${styles.navLink} ${location.pathname === '/community' ? styles.active : ''}`}
              >
                Community
              </Link>
              <Link 
                to="/journal" 
                className={`${styles.navLink} ${location.pathname === '/journal' ? styles.active : ''}`}
              >
                Journal
              </Link>
              <Link 
                to="/profile" 
                className={`${styles.navLink} ${location.pathname === '/profile' ? styles.active : ''}`}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`${styles.navLink} ${location.pathname === '/login' ? styles.active : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className={`${styles.navLink} ${location.pathname === '/register' ? styles.active : ''}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;