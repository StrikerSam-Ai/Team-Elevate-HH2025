import React from 'react';

const FormControl = ({
  children,
  label,
  helperText,
  error,
  success,
  required,
  className = '',
  id,
}) => {
  const controlClass = [
    'form-control',
    error ? 'form-control-error' : '',
    success ? 'form-control-success' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={controlClass}>
      {label && (
        <label className="form-control-label" htmlFor={id}>
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <div className="form-control-input">
        {children}
      </div>

      {(helperText || error) && (
        <span 
          className={`form-control-helper ${error ? 'form-control-error-text' : ''}`}
          id={`${id}-helper`}
        >
          {error || helperText}
        </span>
      )}
    </div>
  );
};

export default FormControl;