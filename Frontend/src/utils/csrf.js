import axios from 'axios';
import { PATHS } from '../config/paths';

/**
 * Get CSRF token from the server and store it in a cookie
 * This should be called before any API request that requires CSRF protection
 */
export const getCSRFToken = async () => {
  try {
    // Request CSRF token from Django backend
    const response = await axios.get(PATHS.API.AUTH.CSRF, {
      withCredentials: true
    });
    
    if (!response.data) {
      throw new Error('Failed to retrieve CSRF token');
    }
    
    // Extract token from response and set in cookies or headers if needed
    // Note: Django should set the CSRF cookie automatically
    
    return response.data;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

/**
 * Extract CSRF token from cookies
 */
export const getCsrfCookieValue = () => {
  const cookieName = 'csrftoken';
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};