import React, { forwardRef } from 'react';
import Input from './Input';

const TextField = forwardRef(({
  label,
  helperText,
  error,
  success,
  startIcon,
  endIcon,
  className = '',
  inputClassName = '',
  ...props
}, ref) => {
  const wrapperClass = [
    'text-field',
    error ? 'text-field-error' : '',
    success ? 'text-field-success' : '',
    startIcon ? 'text-field-has-start-icon' : '',
    endIcon ? 'text-field-has-end-icon' : '',
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
      
      <div className="text-field-input-wrapper">
        {startIcon && (
          <span className="text-field-icon text-field-start-icon">
            {startIcon}
          </span>
        )}
        
        <Input
          ref={ref}
          className={`text-field-input ${inputClassName}`}
          error={error}
          {...props}
        />
        
        {endIcon && (
          <span className="text-field-icon text-field-end-icon">
            {endIcon}
          </span>
        )}
      </div>

      {(helperText || error) && (
        <span className={`text-field-helper ${error ? 'text-field-error-text' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;