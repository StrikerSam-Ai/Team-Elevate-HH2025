import { ethers } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contracts = {};
    this.account = null;
    this.networkId = null;
  }

  /**
   * Initialize the blockchain service
   * @returns {Promise<boolean>} true if initialized, false otherwise
   */
  async initialize() {
    if (window.ethereum) {
      try {
        // Create Web3Provider from browser window.ethereum
        this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
        // Get network information
        const network = await this.provider.getNetwork();
        this.networkId = network.chainId;
        
        // Check if user has already granted access
        const accounts = await this.provider.listAccounts();
        if (accounts.length > 0) {
          this.account = accounts[0];
          this.signer = this.provider.getSigner();
          await this.initContracts();
        }
        
        return true;
      } catch (error) {
        console.error('Error initializing blockchain service:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Connect wallet
   * @returns {Promise<string>} connected account address
   */
  async connectWallet() {
    if (!this.provider) {
      throw new Error('Blockchain provider not initialized');
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      this.account = accounts[0];
      this.signer = this.provider.getSigner();
      
      // Initialize contracts with signer
      await this.initContracts();
      
      return this.account;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  }

  /**
   * Initialize smart contracts
   * @returns {Promise<void>}
   */
  async initContracts() {
    if (!this.signer) {
      return;
    }
    
    try {
      // Initialize each contract defined in the blockchain config
      Object.entries(BLOCKCHAIN_CONFIG.contracts).forEach(([name, config]) => {
        if (config.address && config.abi) {
          this.contracts[name] = new ethers.Contract(
            config.address,
            config.abi,
            this.signer
          );
        }
      });
    } catch (error) {
      console.error('Error initializing contracts:', error);
      throw error;
    }
  }

  /**
   * Switch to a different blockchain network
   * @param {string} networkName - Name of the network from BLOCKCHAIN_CONFIG.networks
   * @returns {Promise<void>}
   */
  async switchNetwork(networkName) {
    if (!this.provider || !window.ethereum) {
      throw new Error('Blockchain provider not initialized');
    }

    try {
      const network = BLOCKCHAIN_CONFIG.networks[networkName];
      if (!network) {
        throw new Error(`Network ${networkName} not found in configuration`);
      }

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: network.chainId }],
      });

      // After switching network, we need to refresh the provider and signer
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      this.signer = this.provider.getSigner();
      await this.initContracts();
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        const network = BLOCKCHAIN_CONFIG.networks[networkName];
        await this.addNetwork(network);
      } else {
        console.error('Error switching network:', error);
        throw error;
      }
    }
  }

  /**
   * Add a new network to the wallet
   * @param {Object} networkConfig - Network configuration object
   * @returns {Promise<void>}
   */
  async addNetwork(networkConfig) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
      });
    } catch (error) {
      console.error('Error adding network:', error);
      throw error;
    }
  }

  /**
   * Get a contract instance
   * @param {string} contractName - Name of the contract from BLOCKCHAIN_CONFIG.contracts
   * @returns {ethers.Contract} Contract instance
   */
  getContract(contractName) {
    if (!this.contracts[contractName]) {
      throw new Error(`Contract ${contractName} not initialized`);
    }
    return this.contracts[contractName];
  }

  /**
   * Get the current connected account
   * @returns {string|null} Account address or null if not connected
   */
  getAccount() {
    return this.account;
  }

  /**
   * Check if wallet is connected
   * @returns {boolean} true if wallet is connected
   */
  isConnected() {
    return !!this.account;
  }
}

export const blockchainService = new BlockchainService();

export default blockchainService;