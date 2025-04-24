import React, { forwardRef } from 'react';

const TextArea = forwardRef(({
  label,
  helperText,
  error,
  success,
  className = '',
  rows = 4,
  maxLength,
  showCount = false,
  ...props
}, ref) => {
  const wrapperClass = [
    'text-field',
    'text-area',
    error ? 'text-field-error' : '',
    success ? 'text-field-success' : '',
    className
  ].filter(Boolean).join(' ');

  const value = props.value || '';
  const characterCount = value.length;

  return (
    <div className={wrapperClass}>
      {label && (
        <label className="text-field-label" htmlFor={props.id}>
          {label}
          {props.required && <span className="required-mark">*</span>}
        </label>
      )}
      
      <div className="text-area-wrapper">
        <textarea
          ref={ref}
          className="text-field-input text-area-input"
          rows={rows}
          maxLength={maxLength}
          {...props}
        />

        {(showCount && maxLength) && (
          <div className="text-area-count">
            {characterCount}/{maxLength}
          </div>
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

TextArea.displayName = 'TextArea';

export default TextArea;