import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setUserMenuOpen(false);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setMobileMenuOpen(false);
  };
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };
  
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" aria-label="ElderHub Home">
            <span className="logo-icon">👵👴</span>
            <span className="logo-text">ElderHub</span>
          </Link>
        </div>
        
        <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link 
                    to="/dashboard" 
                    className={isActive('/dashboard') ? 'active' : ''}
                    aria-current={isActive('/dashboard') ? 'page' : undefined}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/journal" 
                    className={isActive('/journal') ? 'active' : ''}
                    aria-current={isActive('/journal') ? 'page' : undefined}
                  >
                    Journal
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/community" 
                    className={isActive('/community') ? 'active' : ''}
                    aria-current={isActive('/community') ? 'page' : undefined}
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/events" 
                    className={isActive('/events') ? 'active' : ''}
                    aria-current={isActive('/events') ? 'page' : undefined}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/health" 
                    className={isActive('/health') ? 'active' : ''}
                    aria-current={isActive('/health') ? 'page' : undefined}
                  >
                    Health
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link 
                to="/help" 
                className={isActive('/help') ? 'active' : ''}
                aria-current={isActive('/help') ? 'page' : undefined}
              >
                Help Center
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          {user ? (
            <div className="user-menu-container">
              <button 
                className="user-menu-button"
                onClick={toggleUserMenu}
                aria-expanded={userMenuOpen}
                aria-label="User menu"
              >
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt={`${user.firstName} ${user.lastName}`}
                    className="user-avatar"
                  />
                ) : (
                  <div className="user-avatar-placeholder">
                    {user.firstName && user.lastName ? 
                      `${user.firstName[0]}${user.lastName[0]}` : 'U'}
                  </div>
                )}
                <span className="user-name">{user.firstName} {user.lastName}</span>
                <span className="dropdown-icon">▼</span>
              </button>
              
              {userMenuOpen && (
                <div className="user-dropdown">
                  <ul>
                    <li>
                      <Link to="/profile">
                        <span className="dropdown-icon">👤</span>
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/notifications">
                        <span className="dropdown-icon">🔔</span>
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link to="/messages">
                        <span className="dropdown-icon">✉️</span>
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings">
                        <span className="dropdown-icon">⚙️</span>
                        Settings
                      </Link>
                    </li>
                    <li className="divider"></li>
                    <li>
                      <button onClick={handleLogout}>
                        <span className="dropdown-icon">🚪</span>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">Log In</Link>
              <Link to="/register" className="register-button">Sign Up</Link>
            </div>
          )}
          
          <button 
            className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
            <span className="menu-bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;