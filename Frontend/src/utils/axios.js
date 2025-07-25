import axios from 'axios';
import { API_ROUTES, ERROR_MESSAGES } from './constants';
import { getCookie, setCookie, deleteCookie as removeCookie } from './cookies';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${API_ROUTES.AUTH.REFRESH}`,
          {},
          { withCredentials: true }
        );

        const { token } = response.data;
        setCookie('token', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear cookies and redirect to login
        removeCookie('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      switch (error.response.status) {
        case 403:
          error.message = ERROR_MESSAGES.FORBIDDEN;
          break;
        case 404:
          error.message = ERROR_MESSAGES.NOT_FOUND;
          break;
        case 500:
          error.message = ERROR_MESSAGES.SERVER_ERROR;
          break;
        default:
          error.message = error.response.data?.message || ERROR_MESSAGES.SERVER_ERROR;
      }
    } else if (error.request) {
      error.message = ERROR_MESSAGES.NETWORK_ERROR;
    }

    return Promise.reject(error);
  }
);

export default instance;