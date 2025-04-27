import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const companionsAPI = {
  async getCompanions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category) {
        queryParams.append('category', filters.category);
      }
      
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      
      const queryString = queryParams.toString();
      const endpoint = `${PATHS.API.COMPANIONS.LIST}${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching companions:', error);
      throw error;
    }
  },
  
  async getCompanionById(id) {
    try {
      const response = await axios.get(PATHS.API.COMPANIONS.DETAIL(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching companion ${id}:`, error);
      throw error;
    }
  },
  
  async getCompanionCategories() {
    try {
      const response = await axios.get(PATHS.API.COMPANIONS.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching companion categories:', error);
      throw error;
    }
  },
  
  async sendMessage(companionId, message) {
    try {
      const response = await axios.post(PATHS.API.COMPANIONS.CHAT(companionId), { message });
      return response.data;
    } catch (error) {
      console.error('Error sending message to companion:', error);
      throw error;
    }
  },
  
  async getConversationHistory(companionId) {
    try {
      const response = await axios.get(PATHS.API.COMPANIONS.HISTORY(companionId));
      return response.data;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  },
  
  async getFeaturedCompanions() {
    try {
      const response = await axios.get(PATHS.API.COMPANIONS.FEATURED);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured companions:', error);
      throw error;
    }
  },
  
  async getRecommendedCompanions() {
    try {
      const response = await axios.get(PATHS.API.COMPANIONS.RECOMMENDED);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended companions:', error);
      throw error;
    }
  }
};