import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

/**
 * LoadingSpinner component to display a consistent loading indicator
 * across the application
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...',
  fullPage = false
}) => {
  const spinnerClass = `spinner spinner-${size} spinner-${color} ${fullPage ? 'spinner-fullpage' : ''}`;
  
  return (
    <div className={spinnerClass}>
      <div className="spinner-circle"></div>
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  text: PropTypes.string,
  fullPage: PropTypes.bool
};

export default LoadingSpinner;