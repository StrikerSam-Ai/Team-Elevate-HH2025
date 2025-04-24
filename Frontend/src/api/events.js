import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const eventsAPI = {
  async getEvents(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${PATHS.API.EVENTS.LIST}?${params}`);
    return response.data;
  },

  async getEventById(eventId) {
    const response = await axios.get(PATHS.API.EVENTS.DETAIL(eventId));
    return response.data;
  },

  async createEvent(eventData) {
    const response = await axios.post(PATHS.API.EVENTS.CREATE, eventData);
    return response.data;
  },

  async registerForEvent(eventId) {
    const response = await axios.post(PATHS.API.EVENTS.JOIN(eventId));
    return response.data;
  },

  async getEventParticipants(eventId) {
    const response = await axios.get(`${PATHS.API.EVENTS.DETAIL(eventId)}/participants`);
    return response.data;
  },

  async cancelRegistration(eventId) {
    const response = await axios.delete(PATHS.API.EVENTS.JOIN(eventId));
    return response.data;
  },

  async getUpcomingEvents() {
    const response = await axios.get(`${PATHS.API.EVENTS.LIST}?upcoming=true`);
    return response.data;
  },

  async getPastEvents() {
    const response = await axios.get(`${PATHS.API.EVENTS.LIST}?past=true`);
    return response.data;
  }
};