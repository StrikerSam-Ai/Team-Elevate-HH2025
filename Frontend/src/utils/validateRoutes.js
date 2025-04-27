import { PATHS } from '../config/paths';
import { API_CONFIG } from '../config/api';

export const validateRoutes = () => {
  const errors = [];
  
  // Check if all PATH values are strings or functions
  Object.entries(PATHS).forEach(([key, value]) => {
    if (key !== 'API' && typeof value !== 'string' && typeof value !== 'function') {
      errors.push(`Invalid path for ${key}: ${value}`);
    }
  });

  // Check if all API endpoints are valid URLs or functions returning URLs
  const validateEndpoint = (endpoint) => {
    if (typeof endpoint === 'string') {
      try {
        new URL(endpoint, API_CONFIG.BASE_URL);
      } catch {
        return false;
      }
      return true;
    }
    if (typeof endpoint === 'function') {
      try {
        new URL(endpoint(1), API_CONFIG.BASE_URL);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  Object.entries(API_CONFIG.ENDPOINTS).forEach(([section, endpoints]) => {
    Object.entries(endpoints).forEach(([key, endpoint]) => {
      if (!validateEndpoint(endpoint)) {
        errors.push(`Invalid API endpoint for ${section}.${key}: ${endpoint}`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};