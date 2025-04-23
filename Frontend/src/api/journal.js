import axios from '../utils/axios';
import { create } from 'ipfs-http-client';
import { blockchainService } from '../services/blockchainService';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';

// Configure IPFS client
const ipfs = create(BLOCKCHAIN_CONFIG.ipfs);

export const journalAPI = {
  async uploadMedia(file) {
    try {
      const buffer = await file.arrayBuffer();
      const result = await ipfs.add(buffer);
      return result.path;
    } catch (error) {
      console.error('Error uploading media to IPFS:', error);
      throw error;
    }
  },

  async saveEntry(entryData, mediaFiles = []) {
    try {
      // Upload media files to IPFS if any
      const mediaUploads = await Promise.all(
        mediaFiles.map(file => this.uploadMedia(file))
      );

      // Upload content to IPFS
      const entryWithMedia = {
        ...entryData,
        media: mediaUploads,
        timestamp: new Date().toISOString()
      };
      
      const result = await ipfs.add(JSON.stringify(entryWithMedia));
      const ipfsHash = result.path;

      // Store on blockchain and get transaction receipt
      const receipt = await blockchainService.createJournalEntry(ipfsHash);

      // Store in backend for indexing
      await axios.post('/api/journal/entries', {
        ipfsHash,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        timestamp: entryWithMedia.timestamp,
        hasMedia: mediaUploads.length > 0
      });

      return { ipfsHash, transactionHash: receipt.transactionHash };
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw error;
    }
  },

  async getEntries() {
    try {
      // Get entries from blockchain
      const blockchainEntries = await blockchainService.getJournalEntries();

      // Fetch content from IPFS for each entry
      const entriesWithContent = await Promise.all(
        blockchainEntries.map(async (entry) => {
          try {
            const content = await this.getIPFSContent(entry.ipfsHash);
            const isVerified = await blockchainService.verifyEntry(entry.ipfsHash);
            return { 
              ...entry, 
              ...content,
              mediaUrls: content.media?.map(hash => `https://ipfs.io/ipfs/${hash}`),
              isVerified
            };
          } catch (error) {
            console.error(`Error fetching IPFS content for entry ${entry.ipfsHash}:`, error);
            return entry;
          }
        })
      );

      return entriesWithContent;
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  },

  async getIPFSContent(hash) {
    try {
      const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
      const content = await response.json();
      return content;
    } catch (error) {
      console.error('Error fetching IPFS content:', error);
      throw error;
    }
  }
};