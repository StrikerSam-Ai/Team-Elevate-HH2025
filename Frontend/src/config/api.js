const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    CHECK: `${API_BASE_URL}/api/auth/check`
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/user/profile/update`
  },
  EVENTS: {
    LIST: `${API_BASE_URL}/api/events`,
    DETAIL: (id) => `${API_BASE_URL}/api/events/${id}`,
    CREATE: `${API_BASE_URL}/api/events/create`,
    JOIN: (id) => `${API_BASE_URL}/api/events/${id}/join`
  },
  COMMUNITY: {
    LIST: `${API_BASE_URL}/api/communities`,
    DETAIL: (id) => `${API_BASE_URL}/api/communities/${id}`,
    CREATE: `${API_BASE_URL}/api/communities/create`,
    JOIN: (id) => `${API_BASE_URL}/api/communities/${id}/join`,
    POSTS: `${API_BASE_URL}/api/community/posts`
  },
  JOURNAL: {
    LIST: `${API_BASE_URL}/api/journal`,
    CREATE: `${API_BASE_URL}/api/journal/create`,
    UPDATE: (id) => `${API_BASE_URL}/api/journal/${id}/update`,
    DELETE: (id) => `${API_BASE_URL}/api/journal/${id}/delete`
  }
};