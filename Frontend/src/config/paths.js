/**
 * Application route paths
 * Centralizing all paths in one file to ensure consistency across the application
 */

export const PATHS = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  ACCESSIBILITY: '/accessibility',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  COMMUNITY: '/community',
  COMMUNITY_DETAILS: '/community/:id',
  EVENTS: '/events',
  EVENT_DETAILS: '/events/:id',
  JOURNAL: '/journal',
  JOURNAL_ENTRY: '/journal/:id',
  RESOURCES: '/resources',
  FAMILY_CONNECTION: '/family',
  ANALYTICS: '/analytics',
  
  // API routes
  API: {
    BASE: '/api',
    AUTH: {
      LOGIN: '/api/auth/login/',
      REGISTER: '/api/auth/register/',
      LOGOUT: '/api/auth/logout/',
      CHECK: '/api/auth/check/',
      REFRESH: '/api/auth/token/refresh/',
      CSRF: '/api/auth/csrf/',
      PASSWORD_RESET: '/api/auth/password-reset/',
      PASSWORD_RESET_CONFIRM: '/api/auth/password-reset/confirm/'
    },
    USER: {
      PROFILE: '/api/users/profile/',
      UPDATE: '/api/users/update/'
    },
    COMMUNITY: {
      LIST: '/api/community/',
      DETAILS: (id) => `/api/community/${id}/`,
      JOIN: (id) => `/api/community/${id}/join/`,
      LEAVE: (id) => `/api/community/${id}/leave/`
    },
    EVENTS: {
      LIST: '/api/events/',
      DETAILS: (id) => `/api/events/${id}/`,
      REGISTER: (id) => `/api/events/${id}/register/`,
      CANCEL: (id) => `/api/events/${id}/cancel/`
    },
    JOURNAL: {
      LIST: '/api/journal/',
      ENTRY: (id) => `/api/journal/${id}/`,
      CREATE: '/api/journal/create/'
    },
    FAMILY: {
      LIST: '/api/family/',
      CONNECT: '/api/family/connect/',
      DISCONNECT: (id) => `/api/family/${id}/disconnect/`
    }
  }
};

export default PATHS;