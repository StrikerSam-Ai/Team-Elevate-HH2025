import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Page Not Found</h1>
        <p>We couldn't find the page you were looking for. It might have been moved or no longer exists.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="primary-button">
            Return to Dashboard
          </Link>
          <Link to="/companions" className="secondary-button">
            Chat with Companions
          </Link>
        </div>
        
        <div className="help-section">
          <h2>Need Help?</h2>
          <p>If you're having trouble finding what you need, our AI companions can assist you.</p>
          <div className="help-options">
            <Link to="/chat/tech-helper" className="help-option">
              <span className="help-icon">👨‍💻</span>
              <span>Tech Helper</span>
            </Link>
            <Link to="/help" className="help-option">
              <span className="help-icon">📞</span>
              <span>Contact Support</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;