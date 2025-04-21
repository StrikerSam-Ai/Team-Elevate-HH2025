import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="home-link">Return to Home</Link>
    </div>
  );
};

export default NotFound;