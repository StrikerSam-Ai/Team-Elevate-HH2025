import { BrowserProvider } from 'ethers';

const requestAccount = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const provider = new BrowserProvider(window.ethereum);
      return { accounts, provider };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      throw error;
    }
  }
  throw new Error('MetaMask not installed');
};

// Create the blockchainService object that's being imported elsewhere
const blockchainService = {
  requestAccount,
  verifyJournalEntry: async (hash) => {
    // Placeholder implementation
    console.log(`Verifying journal entry with hash: ${hash}`);
    return { verified: true, timestamp: new Date().toISOString() };
  },
  storeHash: async (content) => {
    // Placeholder implementation
    const hash = `0x${Math.random().toString(16).substr(2, 40)}`;
    console.log(`Storing hash for content: ${content.substring(0, 20)}...`);
    return hash;
  }
};

export { requestAccount, blockchainService };
export default blockchainService;