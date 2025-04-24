import { ethers } from 'ethers';

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
  }

  async initialize() {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask to use this feature');
    }

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create Web3Provider and get signer
    this.provider = new ethers.BrowserProvider(window.ethereum);
    this.signer = await this.provider.getSigner();

    return this.signer;
  }

  async verifyEntry(ipfsHash) {
    try {
      // Here we would interact with our smart contract
      // This is a placeholder for the actual verification logic
      const isVerified = true; // Replace with actual contract call
      return isVerified;
    } catch (error) {
      console.error('Error verifying entry:', error);
      throw error;
    }
  }

  async disconnect() {
    this.provider = null;
    this.signer = null;
  }
}

export const blockchainService = new BlockchainService();