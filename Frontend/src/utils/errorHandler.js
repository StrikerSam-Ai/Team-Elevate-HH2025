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
    const { status, data } = error.response;
    const message = data.message || 'An error occurred';
    const errors = data.errors || [];
    
    throw new APIError(message, status, errors);
  }
  
  throw new APIError(error.message || 'Network error', 500);
};

export const formatValidationErrors = (errors) => {
  if (!errors) return {};

  return Object.entries(errors).reduce((acc, [field, messages]) => {
    acc[field] = Array.isArray(messages) ? messages[0] : messages;
    return acc;
  }, {});
};

export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error';
};

export const isAuthenticationError = (error) => {
  return error.response?.status === 401;
};

export const isValidationError = (error) => {
  return error.response?.status === 400 && error.response?.data?.errors;
};

export const isForbiddenError = (error) => {
  return error.response?.status === 403;
};

export const isNotFoundError = (error) => {
  return error.response?.status === 404;
};

// New utility function to help handle errors in UI components
export const getErrorMessage = (error) => {
  if (error instanceof APIError) {
    return error.message;
  }
  
  if (isNetworkError(error)) {
    return 'Unable to connect to server. Please check your internet connection.';
  }
  
  if (isAuthenticationError(error)) {
    return 'Authentication required. Please log in to continue.';
  }
  
  if (isForbiddenError(error)) {
    return 'You do not have permission to perform this action.';
  }
  
  if (isNotFoundError(error)) {
    return 'The requested resource was not found.';
  }
  
  return error?.message || 'An unexpected error occurred.';
};