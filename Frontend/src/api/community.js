import axios from '../utils/axios';
import { PATHS } from '../config/paths';

export const communityAPI = {
  async getCommunities(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await axios.get(`${PATHS.API.COMMUNITY.LIST}?${params}`);
    return response.data;
  },

  async getCommunityById(communityId) {
    const response = await axios.get(PATHS.API.COMMUNITY.DETAIL(communityId));
    return response.data;
  },

  async createCommunity(communityData) {
    const response = await axios.post(PATHS.API.COMMUNITY.CREATE, communityData);
    return response.data;
  },

  async joinCommunity(communityId) {
    const response = await axios.post(PATHS.API.COMMUNITY.JOIN(communityId));
    return response.data;
  },

  async getCommunityMembers(communityId) {
    const response = await axios.get(`${PATHS.API.COMMUNITY.DETAIL(communityId)}/members`);
    return response.data;
  },

  async createPost(communityId, postData) {
    const response = await axios.post(`${PATHS.API.COMMUNITY.DETAIL(communityId)}/posts`, postData);
    return response.data;
  },

  async getPosts(communityId) {
    const response = await axios.get(`${PATHS.API.COMMUNITY.DETAIL(communityId)}/posts`);
    return response.data;
  },

  async addComment(postId, commentData) {
    const response = await axios.post(`${PATHS.API.COMMUNITY.POSTS}/${postId}/comments`, commentData);
    return response.data;
  },

  async getComments(postId) {
    const response = await axios.get(`${PATHS.API.COMMUNITY.POSTS}/${postId}/comments`);
    return response.data;
  }
};