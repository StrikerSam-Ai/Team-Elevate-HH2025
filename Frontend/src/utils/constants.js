// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
  IPFS_URL: process.env.REACT_APP_IPFS_URL || 'https://ipfs.infura.io:5001'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// Event Types
export const EVENT_TYPES = {
  IN_PERSON: 'in_person',
  VIRTUAL: 'virtual',
  HYBRID: 'hybrid'
};

// Community Categories
export const COMMUNITY_CATEGORIES = {
  HEALTH: 'health',
  HOBBY: 'hobby',
  SOCIAL: 'social',
  EDUCATION: 'education',
  SUPPORT: 'support'
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
};

// Theme Configuration
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50
};

// File Upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/quicktime'],
  MAX_FILES: 5
};

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Animation Durations
export const ANIMATION = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500
};