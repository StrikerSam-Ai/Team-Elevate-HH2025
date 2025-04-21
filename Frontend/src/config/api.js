const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    VERIFY: `${API_BASE_URL}/api/auth/verify`
  },
  USER: {
    PROFILE: `${API_BASE_URL}/api/user/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/user/profile/update`
  },
  EVENTS: {
    LIST: `${API_BASE_URL}/api/events`,
    DETAIL: (id) => `${API_BASE_URL}/api/events/${id}`,
    CREATE: `${API_BASE_URL}/api/events/create`
  },
  GROUPS: {
    LIST: `${API_BASE_URL}/api/groups`,
    DETAIL: (id) => `${API_BASE_URL}/api/groups/${id}`,
    JOIN: (id) => `${API_BASE_URL}/api/groups/${id}/join`
  },
  COMMUNITY: {
    POSTS: `${API_BASE_URL}/api/community/posts`,
    COMMENTS: (postId) => `${API_BASE_URL}/api/community/posts/${postId}/comments`
  }
};