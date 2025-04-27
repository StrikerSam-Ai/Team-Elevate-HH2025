import { API_CONFIG } from './api';

export const PATHS = {
    // Frontend routes
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    COMMUNITY: '/community',
    EVENTS: '/events',
    JOURNAL: '/journal',

    // API endpoints (re-exported from API_CONFIG)
    API: API_CONFIG.ENDPOINTS
};