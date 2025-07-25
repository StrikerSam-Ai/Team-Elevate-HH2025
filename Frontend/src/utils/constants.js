/**
 * Application-wide constants
 */

// Storage keys for localStorage/sessionStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  ACCESSIBILITY: 'accessibility_settings',
  THEME: 'theme_preference',
  LANGUAGE: 'language_preference',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  USER_INFO: 'user_info',
  LAST_VISITED: 'last_visited_page'
};

// Timeouts and durations
export const TOAST_DURATION = 5000; // 5 seconds
export const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 minutes
export const TOKEN_REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const PAGINATION_OPTIONS = [5, 10, 25, 50, 100];

// Date and time formats
export const DATE_FORMAT = {
  FULL: 'MMMM D, YYYY',
  SHORT: 'MM/DD/YYYY',
  YEAR_MONTH: 'MMMM YYYY',
  DAY_MONTH: 'MMMM D'
};

export const TIME_FORMAT = {
  HOURS_MINUTES: 'h:mm A', // 3:30 PM
  FULL: 'h:mm:ss A' // 3:30:45 PM
};

// Validation regex patterns
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s-()]{10,15}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/
};

// Feature flags
export const FEATURES = {
  BLOCKCHAIN_INTEGRATION: true,
  VOICE_COMMANDS: false,
  COMPANION_CHAT: true,
  FAMILY_CONNECTION: true,
  WELLNESS_TRACKING: true
};

// User roles and permissions
export const USER_ROLES = {
  SENIOR: 'senior',
  FAMILY_MEMBER: 'family_member',
  CAREGIVER: 'caregiver',
  ADMIN: 'admin'
};

// Event types
export const EVENT_TYPES = {
  COMMUNITY: 'community',
  WELLNESS: 'wellness',
  EDUCATION: 'education',
  SOCIAL: 'social',
  FAMILY: 'family'
};

// Journal entry categories
export const JOURNAL_CATEGORIES = [
  'Memory',
  'Reflection',
  'Health',
  'Family',
  'Achievement',
  'Gratitude'
];

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile',
  },
  COMMUNITIES: {
    LIST: '/api/communities',
    CREATE: '/api/communities',
    DETAIL: (id) => `/api/communities/${id}`,
    MEMBERS: (id) => `/api/communities/${id}/members`,
    EVENTS: (id) => `/api/communities/${id}/events`,
    JOIN: (id) => `/api/communities/${id}/join`,
    LEAVE: (id) => `/api/communities/${id}/leave`,
  },
  EVENTS: {
    LIST: '/api/events',
    CREATE: '/api/events',
    DETAIL: (id) => `/api/events/${id}`,
    PARTICIPANTS: (id) => `/api/events/${id}/participants`,
    REGISTER: (id) => `/api/events/${id}/register`,
    CANCEL: (id) => `/api/events/${id}/cancel`,
  },
  HEALTH: {
    PROFILE: '/api/health/profile',
    UPDATE: '/api/health/profile',
  },
  JOURNAL: {
    LIST: '/api/journal',
    CREATE: '/api/journal',
    DETAIL: (id) => `/api/journal/${id}`,
    UPDATE: (id) => `/api/journal/${id}`,
    DELETE: (id) => `/api/journal/${id}`,
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
  },
};

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  COMMUNITIES: '/communities',
  COMMUNITY_DETAIL: (id) => `/communities/${id}`,
  EVENTS: '/events',
  EVENT_DETAIL: (id) => `/events/${id}`,
  JOURNAL: '/journal',
  NOTIFICATIONS: '/notifications',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Resource not found.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  UNAUTHORIZED: 'Please log in to access this resource.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'Email already exists.',
  INVALID_TOKEN: 'Invalid or expired token.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in.',
  REGISTER: 'Successfully registered.',
  LOGOUT: 'Successfully logged out.',
  PROFILE_UPDATE: 'Profile updated successfully.',
  COMMUNITY_CREATE: 'Community created successfully.',
  COMMUNITY_JOIN: 'Successfully joined the community.',
  COMMUNITY_LEAVE: 'Successfully left the community.',
  EVENT_CREATE: 'Event created successfully.',
  EVENT_REGISTER: 'Successfully registered for the event.',
  EVENT_CANCEL: 'Successfully cancelled event registration.',
  JOURNAL_CREATE: 'Journal entry created successfully.',
  JOURNAL_UPDATE: 'Journal entry updated successfully.',
  JOURNAL_DELETE: 'Journal entry deleted successfully.',
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required.',
  EMAIL: 'Please enter a valid email address.',
  PASSWORD: 'Password must be at least 8 characters long.',
  PASSWORD_MATCH: 'Passwords do not match.',
  PHONE: 'Please enter a valid phone number.',
  DATE: 'Please enter a valid date.',
  TIME: 'Please enter a valid time.',
  URL: 'Please enter a valid URL.',
};

// Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const MAX_PAGE_SIZE = 50;