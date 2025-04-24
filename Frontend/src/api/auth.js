import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const authAPI = {
  async login(credentials) {
    const response = await axios.post(PATHS.API.AUTH.LOGIN, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(userData) {
    const response = await axios.post(PATHS.API.AUTH.REGISTER, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    await axios.post(PATHS.API.AUTH.LOGOUT);
    localStorage.removeItem('token');
  },

  async checkAuth() {
    try {
      const response = await axios.get(PATHS.API.AUTH.CHECK);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
      }
      throw error;
    }
  },

  async refreshCSRFToken() {
    const response = await axios.get(PATHS.API.AUTH.CSRF);
    return response.data.csrfToken;
  }
};