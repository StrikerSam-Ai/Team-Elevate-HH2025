import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PATHS } from '../../config/paths';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    closeMobileMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={PATHS.HOME} className="logo" onClick={closeMobileMenu}>
          ElderHub
        </Link>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
        </div>

        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {isAuthenticated ? (
            // Authenticated navigation links
            <>
              <NavLink 
                to={PATHS.DASHBOARD} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                Dashboard
              </NavLink>
              
              <NavLink 
                to={PATHS.COMMUNITY} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                Community
              </NavLink>
              
              <NavLink 
                to={PATHS.EVENTS} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                Events
              </NavLink>
              
              <NavLink 
                to={PATHS.JOURNAL} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                Journal
              </NavLink>
              
              <NavLink 
                to={PATHS.FAMILY_CONNECTION} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                Family
              </NavLink>
              
              <div className="user-menu">
                <div className="user-menu-trigger">
                  <div className="avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  <span className="user-name">{user?.name || 'User'}</span>
                </div>
                
                <div className="dropdown-menu">
                  <NavLink 
                    to={PATHS.PROFILE} 
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </NavLink>
                  
                  <NavLink 
                    to={PATHS.RESOURCES} 
                    className="dropdown-item"
                    onClick={closeMobileMenu}
                  >
                    Resources
                  </NavLink>
                  
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Public navigation links
            <>
              <NavLink 
                to={PATHS.HOME} 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
              
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              
              <div className="auth-buttons">
                <Link 
                  to={PATHS.LOGIN} 
                  className="btn btn-outline login-btn"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                
                <Link 
                  to={PATHS.REGISTER} 
                  className="btn btn-primary register-btn"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;