import axios from '../utils/axios';
import { PATHS } from '../config/paths';
import { create } from 'ipfs-http-client';

const ipfs = create({ url: process.env.REACT_APP_IPFS_URL || 'https://ipfs.infura.io:5001' });

export const journalAPI = {
  async getEntries() {
    const response = await axios.get(PATHS.API.JOURNAL.LIST);
    return response.data;
  },

  async createEntry(entryData) {
    // Upload media files to IPFS if any
    const mediaUrls = [];
    if (entryData.mediaFiles?.length) {
      for (const file of entryData.mediaFiles) {
        const result = await ipfs.add(file);
        mediaUrls.push(`ipfs://${result.path}`);
      }
    }

    // Create entry data with IPFS hashes
    const data = {
      ...entryData,
      mediaUrls
    };

    const response = await axios.post(PATHS.API.JOURNAL.CREATE, data);
    return response.data;
  },

  async updateEntry(entryId, entryData) {
    const response = await axios.post(PATHS.API.JOURNAL.UPDATE(entryId), entryData);
    return response.data;
  },

  async deleteEntry(entryId) {
    const response = await axios.delete(PATHS.API.JOURNAL.DELETE(entryId));
    return response.data;
  },

  async verifyEntry(hash) {
    const response = await axios.get(PATHS.API.JOURNAL.VERIFY(hash));
    return response.data;
  }
};