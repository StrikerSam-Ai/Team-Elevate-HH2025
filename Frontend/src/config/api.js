export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  TIMEOUT: 30000,
  // Storage keys
  STORAGE: {
    AUTH_TOKEN: 'auth_token',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme',
    LANGUAGE: 'language'
  },
  // API endpoints
  ENDPOINTS: {
    AUTH: {
      CSRF: '/api/auth/csrf/',
      CHECK: '/api/auth/check/',
      LOGIN: '/api/auth/login/',
      REGISTER: '/api/auth/register/',
      LOGOUT: '/api/auth/logout/'
    },
    PROFILE: {
      GET: '/api/profile/',
      UPDATE: '/api/profile/update/',
      PREFERENCES: '/api/profile/preferences/',
      NOTIFICATIONS: '/api/profile/notifications/',
      ACTIVITY: '/api/profile/activity/'
    },
    COMMUNITY: {
      LIST: '/api/communities/',
      CREATE: '/api/communities/create/',
      DETAIL: (id) => `/api/communities/${id}/`,
      JOIN: (id) => `/api/communities/${id}/join/`,
      POSTS: '/api/community/posts/',
      MEMBERS: (id) => `/api/communities/${id}/members/`
    },
    EVENTS: {
      LIST: '/api/events/',
      CREATE: '/api/events/create/',
      DETAIL: (id) => `/api/events/${id}/`,
      JOIN: (id) => `/api/events/${id}/join/`,
      UPCOMING: '/api/events/upcoming/',
      PAST: '/api/events/past/'
    },
    JOURNAL: {
      LIST: '/api/journal/',
      CREATE: '/api/journal/create/',
      UPDATE: (id) => `/api/journal/${id}/update/`,
      DELETE: (id) => `/api/journal/${id}/delete/`,
      VERIFY: (hash) => `/api/journal/verify/${hash}/`
    }
  }
};