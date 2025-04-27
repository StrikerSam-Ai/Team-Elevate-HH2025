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
      REFRESH: '/api/auth/token/refresh/'
    },
    USER: {
      PROFILE: '/api/users/profile/',
      UPDATE: '/api/users/update/'
    },
    COMMUNITY: {
      LIST: '/api/community/',
      DETAILS: '/api/community/:id/',
      JOIN: '/api/community/:id/join/',
      LEAVE: '/api/community/:id/leave/'
    },
    EVENTS: {
      LIST: '/api/events/',
      DETAILS: '/api/events/:id/',
      REGISTER: '/api/events/:id/register/',
      CANCEL: '/api/events/:id/cancel/'
    },
    JOURNAL: {
      LIST: '/api/journal/',
      ENTRY: '/api/journal/:id/',
      CREATE: '/api/journal/create/'
    },
    FAMILY: {
      LIST: '/api/family/',
      CONNECT: '/api/family/connect/',
      DISCONNECT: '/api/family/:id/disconnect/'
    }
  }
};

export default PATHS;