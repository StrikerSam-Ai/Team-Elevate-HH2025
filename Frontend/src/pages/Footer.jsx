import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About ElderHub</h3>
          <p>Making life easier and more connected for our senior community through technology and companionship.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p><Link to="/dashboard">Dashboard</Link></p>
          <p><Link to="/events">Event Finder</Link></p>
          <p><Link to="/community">Community</Link></p>
        </div>
        <div className="footer-section">
          <h3>Contact Support</h3>
          <p>📞 Help Line: 1-800-ELDER-HUB</p>
          <p>📧 Email: help@elderhub.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 ElderHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;