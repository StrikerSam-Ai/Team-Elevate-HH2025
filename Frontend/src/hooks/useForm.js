import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (validationRules) => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const rules = validationRules[field];
      
      if (rules.required && !value) {
        newErrors[field] = 'This field is required';
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || 'Invalid format';
      } else if (rules.validate && !rules.validate(value)) {
        newErrors[field] = rules.message || 'Invalid value';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormData,
    setErrors
  };
};