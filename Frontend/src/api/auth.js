import axios from '../utils/axios';
import { PATHS } from '../config/paths';
import { getCSRFToken } from '../utils/csrf';

export const authAPI = {
  async login(credentials) {
    try {
      // Ensure we have fresh CSRF token before login
      await getCSRFToken();
      
      const response = await axios.post(PATHS.API.AUTH.LOGIN, credentials);
      if (response.data && response.data.token) {
        // Store token in consistent location - use both for compatibility
        localStorage.setItem('token', response.data.token);
        
        if (window.STORAGE_KEYS && window.STORAGE_KEYS.AUTH_TOKEN) {
          localStorage.setItem(window.STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        }
      }
      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      // Ensure we have fresh CSRF token before registration
      await getCSRFToken();
      
      const response = await axios.post(PATHS.API.AUTH.REGISTER, userData);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        if (window.STORAGE_KEYS && window.STORAGE_KEYS.AUTH_TOKEN) {
          localStorage.setItem(window.STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        }
      }
      return response.data;
    } catch (error) {
      console.error('Register API error:', error); 
      throw error;
    }
  },

  async logout() {
    try {
      // Ensure we have fresh CSRF token before logout
      await getCSRFToken();
      
      await axios.post(PATHS.API.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear token storage on logout attempt
      localStorage.removeItem('token');
      
      if (window.STORAGE_KEYS && window.STORAGE_KEYS.AUTH_TOKEN) {
        localStorage.removeItem(window.STORAGE_KEYS.AUTH_TOKEN);
      }
    }
  },

  async checkAuth() {
    try {
      const response = await axios.get(PATHS.API.AUTH.CHECK);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Clear tokens on auth failure
        localStorage.removeItem('token');
        
        if (window.STORAGE_KEYS && window.STORAGE_KEYS.AUTH_TOKEN) {
          localStorage.removeItem(window.STORAGE_KEYS.AUTH_TOKEN);
        }
      }
      throw error;
    }
  },

  async refreshCSRFToken() {
    try {
      const response = await axios.get(PATHS.API.AUTH.CSRF);
      return response.data.csrfToken || true;
    } catch (error) {
      console.error('CSRF token refresh error:', error);
      throw error;
    }
  }
};