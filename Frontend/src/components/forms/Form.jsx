import React from 'react';
import { useForm } from '../hooks';

const Form = ({
  onSubmit,
  initialValues = {},
  validationRules = {},
  validateOnChange = false,
  children,
  className = '',
  ...props
}) => {
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm
  } = useForm(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm(validationRules)) {
      await onSubmit(formData, { resetForm });
    }
  };

  const handleFieldChange = (e) => {
    handleChange(e);
    if (validateOnChange) {
      validateForm({
        [e.target.name]: validationRules[e.target.name]
      });
    }
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onChange: handleFieldChange,
        value: formData[child.props.name] || '',
        error: errors[child.props.name],
      });
    }
    return child;
  });

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`form ${className}`}
      noValidate
      {...props}
    >
      {childrenWithProps}
    </form>
  );
};

export default Form;