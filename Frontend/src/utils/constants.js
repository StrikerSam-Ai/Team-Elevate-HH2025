export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const EVENT_TYPES = {
  ONLINE: 'online',
  OFFLINE: 'offline'
};

export const GROUP_CATEGORIES = {
  HEALTH: 'health',
  HOBBY: 'hobby',
  SOCIAL: 'social',
  LEARNING: 'learning'
};

export const USER_ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences'
};