// frontend/src/utils/axios.js
import axios from 'axios';

// Create an axios instance with default configs
const instance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Point to Django API server
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add request interceptor for CSRF token
instance.interceptors.request.use(function (config) {
  // Get CSRF token from the window object (set in the Django template)
  const csrfToken = window.CSRF_TOKEN;
  
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add response interceptor to handle authentication errors
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page on authentication errors
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;