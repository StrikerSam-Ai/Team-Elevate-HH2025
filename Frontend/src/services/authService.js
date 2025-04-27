import apiService from './apiService';
import { PATHS } from '../config/paths';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  /**
   * Log in a user
   * @param {object} credentials - User credentials (email, password)
   * @returns {Promise<object>} User data and token
   */
  login: async (credentials) => {
    try {
      const response = await apiService.post(PATHS.API.AUTH.LOGIN, credentials);
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      return response;
    } catch (error) {
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
      const response = await apiService.post(PATHS.API.AUTH.REGISTER, userData);
      if (response.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Log out the current user
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      await apiService.post(PATHS.API.AUTH.LOGOUT);
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
      const response = await apiService.get(PATHS.API.AUTH.CHECK);
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
      return await apiService.post('/api/auth/password-reset/', data);
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
      return await apiService.post('/api/auth/password-reset/confirm/', data);
    } catch (error) {
      throw error;
    }
  }
};

export default authService;