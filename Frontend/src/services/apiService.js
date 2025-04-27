import axios from 'axios';
import { API_CONFIG, API_ERRORS } from '../config/api';
import { getCSRFToken } from '../utils/csrf';
import { STORAGE_KEYS } from '../utils/constants';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: API_CONFIG.WITH_CREDENTIALS
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token if exists
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Add CSRF token for non-GET requests
    if (config.method !== 'get') {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Return just the data for successful responses
    return response.data;
  },
  async (error) => {
    // Handle specific error types
    if (error.response) {
      // Server responded with a status code outside 2xx range
      const { status } = error.response;
      
      // Handle authentication errors
      if (status === API_CONFIG.STATUS.UNAUTHORIZED) {
        // Clear auth token and redirect to login if needed
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        
        // Custom error message
        error.message = API_ERRORS.AUTH_ERROR;
        
        // Dispatch auth error event for the auth context to handle
        const event = new CustomEvent('auth:logout');
        window.dispatchEvent(event);
      } 
      // Handle permission errors
      else if (status === API_CONFIG.STATUS.FORBIDDEN) {
        error.message = API_ERRORS.FORBIDDEN_ERROR;
      } 
      // Handle not found errors
      else if (status === API_CONFIG.STATUS.NOT_FOUND) {
        error.message = API_ERRORS.NOT_FOUND_ERROR;
      } 
      // Handle validation errors
      else if (status === API_CONFIG.STATUS.BAD_REQUEST) {
        error.message = error.response.data.message || API_ERRORS.VALIDATION_ERROR;
      } 
      // Handle server errors
      else if (status >= API_CONFIG.STATUS.SERVER_ERROR) {
        error.message = API_ERRORS.SERVER_ERROR;
      }
      
      // Attach response data to error
      error.data = error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      error.message = error.code === 'ECONNABORTED' 
        ? API_ERRORS.TIMEOUT_ERROR 
        : API_ERRORS.NETWORK_ERROR;
    } 
    
    return Promise.reject(error);
  }
);

// API service methods
const apiService = {
  /**
   * Get request
   * @param {string} url - API endpoint
   * @param {Object} params - URL parameters
   * @param {Object} config - Additional axios config
   * @returns {Promise<any>} Response data
   */
  get: (url, params = {}, config = {}) => {
    return apiClient.get(url, { params, ...config });
  },

  /**
   * Post request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise<any>} Response data
   */
  post: (url, data = {}, config = {}) => {
    return apiClient.post(url, data, config);
  },

  /**
   * Put request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise<any>} Response data
   */
  put: (url, data = {}, config = {}) => {
    return apiClient.put(url, data, config);
  },

  /**
   * Patch request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise<any>} Response data
   */
  patch: (url, data = {}, config = {}) => {
    return apiClient.patch(url, data, config);
  },

  /**
   * Delete request
   * @param {string} url - API endpoint
   * @param {Object} config - Additional axios config
   * @returns {Promise<any>} Response data
   */
  delete: (url, config = {}) => {
    return apiClient.delete(url, config);
  },
  
  /**
   * Upload file(s)
   * @param {string} url - API endpoint
   * @param {FormData} formData - Form data with files
   * @param {Function} onProgress - Progress callback
   * @returns {Promise<any>} Response data
   */
  upload: (url, formData, onProgress = null) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    
    if (onProgress) {
      config.onUploadProgress = (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      };
    }
    
    return apiClient.post(url, formData, config);
  }
};

export default apiService;