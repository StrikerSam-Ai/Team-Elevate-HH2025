export class APIError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = 'APIError';
  }
}

export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { data, status } = error.response;
    const message = data.message || 'An error occurred';
    const errors = data.errors || [];
    throw new APIError(message, status, errors);
  } else if (error.request) {
    // Request was made but no response received
    throw new APIError('Network error - no response received', 0);
  } else {
    // Error in request setup
    throw new APIError('Request setup error', 0);
  }
};

export const formatValidationErrors = (errors) => {
  if (!Array.isArray(errors)) {
    return Object.entries(errors).reduce((acc, [field, messages]) => {
      acc[field] = Array.isArray(messages) ? messages[0] : messages;
      return acc;
    }, {});
  }
  return errors.reduce((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {});
};