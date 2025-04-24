import axios from 'axios';
import { getCSRFToken } from './csrf';

const instance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for CSRF token
instance.interceptors.request.use(function (config) {
    // Exclude CSRF token for GET requests and certain endpoints
    if (config.method !== 'get') {
        const csrfToken = getCSRFToken();
        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;