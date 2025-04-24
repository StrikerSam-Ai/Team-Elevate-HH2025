import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const profileAPI = {
  async getProfile() {
    const response = await axios.get(PATHS.API.PROFILE.GET);
    return response.data;
  },

  async updateProfile(profileData) {
    const formData = new FormData();
    
    // Handle profile picture upload
    if (profileData.avatar instanceof File) {
      formData.append('avatar', profileData.avatar);
    }

    // Append other profile data
    Object.keys(profileData).forEach(key => {
      if (key !== 'avatar' || !(profileData[key] instanceof File)) {
        formData.append(key, profileData[key]);
      }
    });

    const response = await axios.post(PATHS.API.PROFILE.UPDATE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updatePreferences(preferences) {
    const response = await axios.post(`${PATHS.API.PROFILE.UPDATE}/preferences`, preferences);
    return response.data;
  },

  async getNotificationSettings() {
    const response = await axios.get(`${PATHS.API.PROFILE.GET}/notifications`);
    return response.data;
  },

  async updateNotificationSettings(settings) {
    const response = await axios.post(`${PATHS.API.PROFILE.UPDATE}/notifications`, settings);
    return response.data;
  },

  async getActivityHistory() {
    const response = await axios.get(`${PATHS.API.PROFILE.GET}/activity`);
    return response.data;
  },

  async deleteAccount() {
    const response = await axios.delete(PATHS.API.PROFILE.GET);
    return response.data;
  }
};