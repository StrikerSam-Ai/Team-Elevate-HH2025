export const PATHS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    COMMUNITY: '/community',
    EVENTS: '/events',
    JOURNAL: '/journal',
    API: {
        AUTH: {
            CSRF: '/api/auth/csrf/',
            CHECK: '/api/auth/check/',
            LOGIN: '/api/auth/login/',
            REGISTER: '/api/auth/register/',
            LOGOUT: '/api/auth/logout/'
        },
        PROFILE: {
            GET: '/api/profile/',
            UPDATE: '/api/profile/update/'
        },
        COMMUNITY: {
            LIST: '/api/communities/',
            CREATE: '/api/communities/create/',
            DETAIL: (id) => `/api/communities/${id}/`,
            JOIN: (id) => `/api/communities/${id}/join/`
        },
        EVENTS: {
            LIST: '/api/events/',
            CREATE: '/api/events/create/',
            DETAIL: (id) => `/api/events/${id}/`,
            JOIN: (id) => `/api/events/${id}/join/`
        },
        JOURNAL: {
            LIST: '/api/journal/',
            CREATE: '/api/journal/create/',
            UPDATE: (id) => `/api/journal/${id}/update/`,
            DELETE: (id) => `/api/journal/${id}/delete/`,
            VERIFY: (hash) => `/api/journal/verify/${hash}`
        }
    }
};