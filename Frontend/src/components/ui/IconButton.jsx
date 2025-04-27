import React from 'react';

const IconButton = ({
  icon,
  label,
  variant = 'primary',
  size = 'medium',
  circle = false,
  className = '',
  ...props
}) => {
  const buttonClass = [
    'icon-button',
    `button-${variant}`,
    `icon-button-${size}`,
    circle ? 'icon-button-circle' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClass}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;