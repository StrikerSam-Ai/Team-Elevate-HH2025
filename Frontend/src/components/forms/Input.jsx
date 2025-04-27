import React from 'react';

const Input = ({
  label,
  error,
  id,
  type = 'text',
  className = '',
  required = false,
  ...props
}) => {
  const inputClasses = [
    'input',
    error ? 'input-error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;