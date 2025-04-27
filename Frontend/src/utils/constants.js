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
  ONBOARDING_COMPLETE: 'onboarding_complete'
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