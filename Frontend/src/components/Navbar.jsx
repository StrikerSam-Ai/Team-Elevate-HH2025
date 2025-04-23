import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">ElderHub</div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        {user ? (
          <>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              Dashboard
            </Link>
            <Link 
              to="/community" 
              className={location.pathname === '/community' ? 'active' : ''}
            >
              Community
            </Link>
            <Link 
              to="/events" 
              className={location.pathname === '/events' ? 'active' : ''}
            >
              Events
            </Link>
            <Link 
              to="/journal" 
              className={location.pathname === '/journal' ? 'active' : ''}
            >
              Journal
            </Link>
            <Link 
              to="/profile" 
              className={location.pathname === '/profile' ? 'active' : ''}
            >
              Profile
            </Link>
            <button onClick={logout} className="button button-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={location.pathname === '/register' ? 'active' : ''}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;