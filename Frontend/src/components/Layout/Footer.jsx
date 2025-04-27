import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">ElderHub</h3>
            <p className="footer-description">
              A platform designed to enrich senior lives through meaningful connections, 
              community engagement, and family bonds.
            </p>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/community">Community</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link to="/accessibility">Accessibility</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <p className="contact-info">
              <span>Email: </span>
              <a href="mailto:contact@elderhub.com">contact@elderhub.com</a>
            </p>
            <p className="contact-info">
              <span>Support: </span>
              <a href="tel:+1-800-123-4567">1-800-123-4567</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} ElderHub. All rights reserved.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;