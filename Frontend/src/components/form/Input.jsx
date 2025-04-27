import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './FormComponents.css';

/**
 * Reusable Input component
 */
const Input = forwardRef(({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  fullWidth = false,
  size = 'medium',
  ...props
}, ref) => {
  // Generate unique ID if not provided
  const inputId = id || `input-${name}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Combine classes
  const inputClass = `form-input ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''} input-${size} ${fullWidth ? 'input-full-width' : ''} ${className}`;
  
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={inputId} className={`form-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        ref={ref}
        name={name}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        required={required}
        {...props}
      />
      
      {error && (
        <p id={`${inputId}-error`} className="form-error">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="form-helper-text">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Input;