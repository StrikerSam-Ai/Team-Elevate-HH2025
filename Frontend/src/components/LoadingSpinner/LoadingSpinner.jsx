import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  const spinnerClass = `loading-spinner loading-spinner-${size}`;
  
  return (
    <div className="loading-spinner-container">
      <div className={spinnerClass} />
    </div>
  );
};

export default LoadingSpinner;