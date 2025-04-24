import api from '../utils/axios';

export const authService = {
    async register(userData) {
        // Ensure we have a fresh CSRF token before registration
        await api.get('/api/get-csrf-token/');
        const response = await api.post('/api/register/', userData);
        return response.data;
    },

    async login(credentials) {
        // Ensure we have a fresh CSRF token before login
        await api.get('/api/get-csrf-token/');
        const response = await api.post('/api/login/', credentials);
        return response.data;
    },

    async logout() {
        const response = await api.post('/api/logout/');
        return response.data;
    },

    async checkAuth() {
        const response = await api.get('/api/check-auth/');
        return response.data;
    }
};