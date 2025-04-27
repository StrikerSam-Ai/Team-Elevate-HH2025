import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Reusable Button component with multiple variants
 */
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  startIcon,
  endIcon,
  className = '',
  onClick,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full-width' : '';
  const disabledClass = disabled ? 'btn-disabled' : '';
  const loadingClass = isLoading ? 'btn-loading' : '';

  const combinedClasses = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    disabledClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {startIcon && <span className="btn-icon btn-icon-start">{startIcon}</span>}
      {isLoading ? (
        <span className="btn-loader"></span>
      ) : (
        <span className="btn-text">{children}</span>
      )}
      {endIcon && <span className="btn-icon btn-icon-end">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'danger', 'success']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;