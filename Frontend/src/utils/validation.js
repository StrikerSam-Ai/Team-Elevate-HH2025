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

export const fileSize = (maxSize) => ({
  validate: (file) => !file || file.size <= maxSize,
  message: `File size must not exceed ${maxSize / (1024 * 1024)}MB`
});

export const fileType = (types) => ({
  validate: (file) => !file || types.some(type => file.type.startsWith(type)),
  message: `File must be one of: ${types.join(', ')}`
});

export const journalEntry = {
  content: {
    validate: (value) => value.trim().length >= 2,
    message: 'Entry must be at least 2 characters long'
  },
  media: {
    validate: (files) => {
      if (!files || !files.length) return true;
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/', 'video/'];
      return files.every(file => 
        file.size <= maxSize && 
        allowedTypes.some(type => file.type.startsWith(type))
      );
    },
    message: 'Each file must be under 10MB and be an image or video'
  }
};