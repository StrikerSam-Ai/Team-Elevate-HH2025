// Regular expressions for validation
export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[1-9]\d{1,14}$/,
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  username: /^[a-zA-Z0-9_]{3,20}$/
};

// Common validation rules
export const validationRules = {
  required: {
    required: true,
    message: 'This field is required'
  },
  email: {
    pattern: patterns.email,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: patterns.phone,
    message: 'Please enter a valid phone number'
  },
  url: {
    pattern: patterns.url,
    message: 'Please enter a valid URL'
  },
  password: {
    pattern: patterns.password,
    message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number'
  },
  username: {
    pattern: patterns.username,
    message: 'Username must be between 3-20 characters and can only contain letters, numbers, and underscores'
  }
};

// Form validation schemas
export const authValidation = {
  login: {
    email: validationRules.email,
    password: validationRules.required
  },
  register: {
    email: validationRules.email,
    password: validationRules.password,
    username: validationRules.username,
    name: validationRules.required
  }
};

export const profileValidation = {
  name: validationRules.required,
  email: validationRules.email,
  phone: validationRules.phone,
  website: validationRules.url
};

export const journalValidation = {
  content: {
    required: true,
    minLength: 10,
    message: 'Entry must be at least 10 characters long'
  },
  tags: {
    validate: (value) => Array.isArray(value) && value.length <= 5,
    message: 'You can add up to 5 tags'
  }
};

// Validation helper functions
export const validateField = (value, rules) => {
  if (!rules) return '';

  if (rules.required && !value) {
    return rules.message || 'This field is required';
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return rules.message || 'Invalid format';
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (rules.validate && !rules.validate(value)) {
    return rules.message || 'Invalid value';
  }

  return '';
};