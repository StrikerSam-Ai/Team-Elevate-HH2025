import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.journalContract = null;
    this.isInitialized = false;
  }

  async initialize() {
    if (this.isInitialized) return;

    if (!window.ethereum) {
      throw new Error('Please install MetaMask or another Web3 wallet');
    }

    try {
      // Connect to the provider
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Get signer
      this.signer = this.provider.getSigner();
      
      // Check if we're on the correct network
      const network = await this.provider.getNetwork();
      const expectedChainId = parseInt(BLOCKCHAIN_CONFIG.baseNetwork.testnet.chainId);
      
      if (network.chainId !== expectedChainId) {
        await this.switchToBaseNetwork();
      }

      // Initialize contract
      this.journalContract = new ethers.Contract(
        BLOCKCHAIN_CONFIG.contracts.JournalRegistry.address,
        BLOCKCHAIN_CONFIG.contracts.JournalRegistry.abi,
        this.signer
      );

      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing blockchain service:', error);
      throw error;
    }
  }

  async switchToBaseNetwork() {
    const baseNetwork = BLOCKCHAIN_CONFIG.baseNetwork.testnet;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: baseNetwork.chainId }],
      });
    } catch (switchError) {
      // This error code means the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [baseNetwork],
        });
      } else {
        throw switchError;
      }
    }
  }

  async createJournalEntry(ipfsHash) {
    await this.initialize();
    
    try {
      const tx = await this.journalContract.createJournalEntry(ipfsHash);
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw error;
    }
  }

  async getJournalEntries() {
    await this.initialize();
    
    try {
      const address = await this.signer.getAddress();
      const entries = await this.journalContract.getJournalEntries(address);
      return entries.map(entry => ({
        ipfsHash: entry.ipfsHash,
        timestamp: new Date(entry.timestamp.toNumber() * 1000)
      }));
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw error;
    }
  }

  async verifyEntry(ipfsHash) {
    await this.initialize();
    
    try {
      const address = await this.signer.getAddress();
      const entries = await this.getJournalEntries();
      return entries.some(entry => entry.ipfsHash === ipfsHash);
    } catch (error) {
      console.error('Error verifying entry:', error);
      throw error;
    }
  }
}

export const blockchainService = new BlockchainService();