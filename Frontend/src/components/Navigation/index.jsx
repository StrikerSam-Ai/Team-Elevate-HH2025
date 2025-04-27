import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import './Navigation.css';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { highContrast, textSize, toggleHighContrast, increaseTextSize } = useAccessibility();
  
  // Check if the current path matches the nav item path
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <span className="logo-icon">🌳</span>
          <span className="logo-text">ElderHub</span>
        </Link>

        <button 
          className="mobile-menu-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className="menu-icon">☰</span>
        </button>

        <div className={`nav-links ${isMobileMenuOpen ? 'show' : ''}`}>
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-label">Dashboard</span>
          </Link>
          
          <Link 
            to="/companions" 
            className={`nav-item ${isActive('/companions') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">💬</span>
            <span className="nav-label">Companions</span>
          </Link>
          
          <Link 
            to="/events" 
            className={`nav-item ${isActive('/events') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📅</span>
            <span className="nav-label">Events</span>
          </Link>
          
          <Link 
            to="/wellness" 
            className={`nav-item ${isActive('/wellness') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">❤️</span>
            <span className="nav-label">Wellness</span>
          </Link>
          
          <Link 
            to="/resources" 
            className={`nav-item ${isActive('/resources') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span className="nav-icon">📚</span>
            <span className="nav-label">Resources</span>
          </Link>
        </div>
        
        <div className="nav-actions">
          <button 
            className="text-size-button" 
            aria-label="Increase text size"
            onClick={increaseTextSize}
          >
            A<sup>+</sup>
          </button>
          <button 
            className={`high-contrast-button ${highContrast ? 'active' : ''}`} 
            aria-label="Toggle high contrast"
            onClick={toggleHighContrast}
          >
            <span className="contrast-icon">◐</span>
          </button>
          <Link to="/profile" className="profile-button" onClick={closeMobileMenu}>
            <div className="profile-avatar">
              <span>E</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;