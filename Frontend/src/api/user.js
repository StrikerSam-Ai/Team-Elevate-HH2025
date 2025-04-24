import axios from '../utils/axios';

export const userAPI = {
  async getProfile() {
    return axios.get('/api/profile/');
  },

  async updateProfile(profileData) {
    const tokenResponse = await axios.get('/get-csrf-token/');
    const csrfToken = tokenResponse.data.csrfToken;
    
    return axios.post('/api/profile/', profileData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      }
    });
  },

  async getCommunities() {
    return axios.get('/api/communities/');
  },

  async joinCommunity(communityId) {
    const tokenResponse = await axios.get('/get-csrf-token/');
    const csrfToken = tokenResponse.data.csrfToken;
    
    return axios.post(`/api/communities/${communityId}/join/`, {}, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
  }
};