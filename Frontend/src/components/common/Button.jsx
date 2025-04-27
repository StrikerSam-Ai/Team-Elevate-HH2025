import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseClass = 'button';
  const variantClass = `button-${variant}`;
  const sizeClass = `button-${size}`;
  const widthClass = fullWidth ? 'button-full' : '';
  
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;