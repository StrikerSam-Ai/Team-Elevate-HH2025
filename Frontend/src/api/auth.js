import axios from '../utils/axios';

export const authAPI = {
  async login(email, password) {
    const tokenResponse = await axios.get('/get-csrf-token/');
    const csrfToken = tokenResponse.data.csrfToken;
    
    return axios.post('/login/', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      withCredentials: true
    });
  },

  async register(userData) {
    const tokenResponse = await axios.get('/get-csrf-token/');
    const csrfToken = tokenResponse.data.csrfToken;
    
    return axios.post('/api/register/', userData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    });
  },

  async logout() {
    return axios.post('/logout/');
  },

  async checkAuth() {
    return axios.get('/api/check-auth/');
  }
};