import apiService from './apiService';
import { PATHS } from '../config/paths';
import { STORAGE_KEYS } from '../utils/constants';
import { getCSRFToken, getCsrfCookieValue } from '../utils/csrf';

export const authService = {
  /**
   * Log in a user
   * @param {object} credentials - User credentials (email, password)
   * @returns {Promise<object>} User data and token
   */
  login: async (credentials) => {
    try {
      // Ensure we have fresh CSRF token before login attempt
      await getCSRFToken();
      
      // Make login request with proper CSRF protection
      const response = await apiService.post(PATHS.API.AUTH.LOGIN, credentials, {
        headers: {
          'X-CSRFToken': getCsrfCookieValue()
        },
        withCredentials: true
      });
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<object>} User data and token
   */
  register: async (userData) => {
    try {
      // Ensure we have fresh CSRF token before registration attempt
      await getCSRFToken();
      
      // Make registration request with proper CSRF protection
      const response = await apiService.post(PATHS.API.AUTH.REGISTER, userData, {
        headers: {
          'X-CSRFToken': getCsrfCookieValue()
        },
        withCredentials: true
      });
      
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Log out the current user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      // Ensure CSRF token is included in logout request
      await getCSRFToken();
      
      await apiService.post(PATHS.API.AUTH.LOGOUT, {}, {
        headers: {
          'X-CSRFToken': getCsrfCookieValue()
        },
        withCredentials: true
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  },

  /**
   * Check if user is currently authenticated
   * @returns {Promise<object>} Auth status and user data
   */
  checkAuth: async () => {
    try {
      const response = await apiService.get(PATHS.API.AUTH.CHECK, {}, {
        withCredentials: true
      });
      return response;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
      throw error;
    }
  },

  /**
   * Request a password reset
   * @param {object} data - Email information
   * @returns {Promise<object>} Reset confirmation
   */
  requestPasswordReset: async (data) => {
    try {
      await getCSRFToken();
      return await apiService.post(PATHS.API.AUTH.PASSWORD_RESET, data, {
        headers: {
          'X-CSRFToken': getCsrfCookieValue()
        },
        withCredentials: true
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Confirm password reset with token
   * @param {object} data - Reset token and new password
   * @returns {Promise<object>} Reset confirmation
   */
  confirmPasswordReset: async (data) => {
    try {
      await getCSRFToken();
      return await apiService.post(PATHS.API.AUTH.PASSWORD_RESET_CONFIRM, data, {
        headers: {
          'X-CSRFToken': getCsrfCookieValue()
        },
        withCredentials: true
      });
    } catch (error) {
      throw error;
    }
  }
};

export default authService;