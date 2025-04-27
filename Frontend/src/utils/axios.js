import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { getCSRFToken } from './csrf';

const instance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add CSRF token and auth token to requests
instance.interceptors.request.use(
  (config) => {
    // Add CSRF token for non-GET requests
    if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(config.method)) {
      config.headers['X-CSRFToken'] = getCSRFToken();
    }
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default instance;