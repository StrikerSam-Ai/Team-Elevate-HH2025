import { useState, useCallback } from 'react';

export const useForm = (initialState = {}, validationSchema = null) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
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

    // Mark field as touched
    if (!touched[name]) {
      setTouched(prev => ({
        ...prev,
        [name]: true
      }));
    }
  }, [errors, touched]);

  const validateField = useCallback((name, value) => {
    if (!validationSchema || !validationSchema[name]) return '';

    const rules = validationSchema[name];
    
    if (rules.required && !value) {
      return 'This field is required';
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || 'Invalid format';
    }
    
    if (rules.validate && !rules.validate(value)) {
      return rules.message || 'Invalid value';
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `Must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `Must be no more than ${rules.maxLength} characters`;
    }

    return '';
  }, [validationSchema]);

  const validateForm = useCallback(() => {
    if (!validationSchema) return true;

    const newErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(field => {
      const value = formData[field];
      const error = validateField(field, value);
      
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validationSchema, validateField]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [validateField]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
    setErrors({});
    setTouched({});
  }, [initialState]);

  const setFieldValue = useCallback((name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setFieldValue,
    setFormData
  };
};