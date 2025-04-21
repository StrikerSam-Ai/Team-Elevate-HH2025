export const required = (value) => ({
  required: true,
  validate: (val) => !!val?.toString().trim(),
  message: 'This field is required'
});

export const email = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: 'Please enter a valid email address'
};

export const phone = {
  pattern: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  message: 'Please enter a valid phone number'
};

export const minLength = (min) => ({
  validate: (value) => !value || value.length >= min,
  message: `Must be at least ${min} characters`
});

export const maxLength = (max) => ({
  validate: (value) => !value || value.length <= max,
  message: `Must be no more than ${max} characters`
});

export const matches = (pattern, message) => ({
  pattern,
  message
});

export const age = (min = 18) => ({
  validate: (value) => {
    if (!value) return true;
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= min;
  },
  message: `Must be at least ${min} years old`
});

export const passwordStrength = {
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
};

export const matchesField = (field, fieldName) => ({
  validate: (value, formData) => value === formData[field],
  message: `Must match ${fieldName}`
});