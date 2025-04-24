export const PATHS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    COMMUNITY: '/community',
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
        TEXT_GENERATION: '/api/text-generation/'
    }
};