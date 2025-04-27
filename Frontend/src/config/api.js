/**
 * API configuration
 */

export const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: process.env.REACT_APP_API_URL || '',
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json'
  },
  
  // API version
  VERSION: 'v1',
  
  // Credentials handling
  WITH_CREDENTIALS: true,
  
  // Response types
  RESPONSE_TYPE: {
    JSON: 'json',
    TEXT: 'text',
    BLOB: 'blob'
  },
  
  // HTTP status codes
  STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500
  },
  
  // API endpoints - for reference (actual endpoints are in paths.js)
  ENDPOINTS: {
    AUTH: '/auth',
    USERS: '/users',
    COMMUNITY: '/community',
    EVENTS: '/events',
    JOURNAL: '/journal',
    RESOURCES: '/resources',
    FAMILY: '/family',
    ANALYTICS: '/analytics'
  }
};

// Error messages
export const API_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  AUTH_ERROR: 'Authentication failed. Please login again.',
  FORBIDDEN_ERROR: 'You do not have permission to access this resource.',
  NOT_FOUND_ERROR: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.'
};

export default API_CONFIG;