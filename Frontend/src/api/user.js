import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const userAPI = {
  async getProfile() {
    const response = await axios.get(PATHS.API.PROFILE.GET);
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await axios.post(PATHS.API.PROFILE.UPDATE, profileData);
    return response.data;
  },

  async getCommunities() {
    const response = await axios.get(PATHS.API.COMMUNITY.LIST);
    return response.data;
  },

  async joinCommunity(communityId) {
    const response = await axios.post(PATHS.API.COMMUNITY.JOIN(communityId));
    return response.data;
  },

  async getEvents() {
    const response = await axios.get(PATHS.API.EVENTS.LIST);
    return response.data;
  },

  async joinEvent(eventId) {
    const response = await axios.post(PATHS.API.EVENTS.JOIN(eventId));
    return response.data;
  },

  async getJournalEntries() {
    const response = await axios.get(PATHS.API.JOURNAL.LIST);
    return response.data;
  },

  async createJournalEntry(entryData) {
    const response = await axios.post(PATHS.API.JOURNAL.CREATE, entryData);
    return response.data;
  },

  async updateJournalEntry(entryId, entryData) {
    const response = await axios.post(PATHS.API.JOURNAL.UPDATE(entryId), entryData);
    return response.data;
  },

  async deleteJournalEntry(entryId) {
    const response = await axios.delete(PATHS.API.JOURNAL.DELETE(entryId));
    return response.data;
  }
};