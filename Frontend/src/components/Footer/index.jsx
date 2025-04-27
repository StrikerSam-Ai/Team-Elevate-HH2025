import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-section branding">
            <Link to="/" className="footer-logo" aria-label="ElderHub Home">
              <span className="logo-icon">👵👴</span>
              <span className="logo-text">ElderHub</span>
            </Link>
            <p className="tagline">Connecting seniors with community, care, and companionship</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook">
                <i className="social-icon">f</i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter">
                <i className="social-icon">t</i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <i className="social-icon">i</i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to our YouTube channel">
                <i className="social-icon">y</i>
              </a>
            </div>
          </div>
          
          <nav className="footer-section">
            <h3>Navigate</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/testimonials">Testimonials</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </nav>
          
          <nav className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/accessibility">Accessibility</Link></li>
              <li><Link to="/community-guidelines">Community Guidelines</Link></li>
            </ul>
          </nav>
          
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <address>
              <p><strong>Email:</strong> <a href="mailto:support@elderhub.com">support@elderhub.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+1800-123-4567">1-800-123-4567</a></p>
              <p><strong>Address:</strong> 123 Elder Street<br />Community Town, CT 06510<br />United States</p>
            </address>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-info">
            <p>&copy; {currentYear} ElderHub. All Rights Reserved.</p>
          </div>
          <nav className="legal-links">
            <ul>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="accessibility-controls">
        <button className="accessibility-button" aria-label="Increase Text Size">
          <span className="accessibility-icon">A+</span>
        </button>
        <button className="accessibility-button" aria-label="Decrease Text Size">
          <span className="accessibility-icon">A-</span>
        </button>
        <button className="accessibility-button" aria-label="Toggle High Contrast">
          <span className="accessibility-icon">💡</span>
        </button>
        <button className="accessibility-button" aria-label="Read Page Aloud">
          <span className="accessibility-icon">🔊</span>
        </button>
      </div>
      
      <div className="back-to-top">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <span className="arrow-up">↑</span> Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;