import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './FormComponents.css';

/**
 * Reusable Select component
 */
const Select = forwardRef(({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
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
  const selectId = id || `select-${name}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Combine classes
  const selectClass = `form-input form-select ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''} input-${size} ${fullWidth ? 'input-full-width' : ''} ${className}`;
  
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={selectId} className={`form-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      
      <div className="select-wrapper">
        <select
          id={selectId}
          ref={ref}
          name={name}
          className={selectClass}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <p id={`${selectId}-error`} className="form-error">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${selectId}-helper`} className="form-helper-text">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Select;