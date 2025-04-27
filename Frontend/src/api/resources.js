import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const resourcesAPI = {
  async getResources(filters = {}) {
    try {
      // Convert filters to query params
      const queryParams = new URLSearchParams();
      
      if (filters.category && filters.category !== 'all') {
        queryParams.append('category', filters.category);
      }
      
      if (filters.search) {
        queryParams.append('search', filters.search);
      }
      
      const queryString = queryParams.toString();
      const endpoint = `${PATHS.API.RESOURCES.LIST}${queryString ? `?${queryString}` : ''}`;
      
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },
  
  async getResourceById(id) {
    try {
      const response = await axios.get(`${PATHS.API.RESOURCES.DETAIL(id)}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource ${id}:`, error);
      throw error;
    }
  },
  
  async getResourceCategories() {
    try {
      const response = await axios.get(PATHS.API.RESOURCES.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource categories:', error);
      throw error;
    }
  },

  async getFeaturedResources() {
    try {
      const response = await axios.get(PATHS.API.RESOURCES.FEATURED);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured resources:', error);
      throw error;
    }
  },

  async getRecommendedResources() {
    try {
      const response = await axios.get(PATHS.API.RESOURCES.RECOMMENDED);
      return response.data;
    } catch (error) {
      console.error('Error fetching recommended resources:', error);
      throw error;
    }
  }
};