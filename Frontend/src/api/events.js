import axios from '../utils/axios';

export const eventsAPI = {
  async getEvents() {
    return axios.get('/api/events/');
  },

  async getEventById(eventId) {
    return axios.get(`/api/events/${eventId}/`);
  },

  async registerForEvent(eventId) {
    const tokenResponse = await axios.get('/get-csrf-token/');
    const csrfToken = tokenResponse.data.csrfToken;
    
    return axios.post(`/api/events/${eventId}/register/`, {}, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
  },

  async getGroups() {
    return axios.get('/api/groups/');
  },

  async getGroupById(groupId) {
    return axios.get(`/api/groups/${groupId}/`);
  },

  async joinGroup(groupId) {
    const tokenResponse = await axios.get('/get-csrf-token/');
    const csrfToken = tokenResponse.data.csrfToken;
    
    return axios.post(`/api/groups/${groupId}/join/`, {}, {
      headers: {
        'X-CSRFToken': csrfToken
      }
    });
  }
};