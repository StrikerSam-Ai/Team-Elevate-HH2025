import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  helperText,
  error,
  success,
  className = '',
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const wrapperClass = [
    'text-field',
    'select-wrapper',
    error ? 'text-field-error' : '',
    success ? 'text-field-success' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <label className="text-field-label" htmlFor={props.id}>
          {label}
          {props.required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <div className="select-input-wrapper">
        <select
          ref={ref}
          className="text-field-input select-input"
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(option => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <span className="select-arrow">▼</span>
      </div>

      {(helperText || error) && (
        <span className={`text-field-helper ${error ? 'text-field-error-text' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;