import { STORAGE_KEYS } from './constants';

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getStoredToken = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const setStoredToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const removeStoredToken = () => {
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getUserPreferences = () => {
  const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
  return prefs ? JSON.parse(prefs) : {};
};

export const setUserPreferences = (preferences) => {
  localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};