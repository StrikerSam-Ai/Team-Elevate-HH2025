// Blockchain configuration for the application

export const BLOCKCHAIN_CONFIG = {
  // Default network configuration
  defaultNetwork: {
    chainId: '0x89', // Polygon Mainnet
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    blockExplorerUrls: ['https://polygonscan.com']
  },
  
  // Network options
  networks: {
    polygon: {
      chainId: '0x89', // Polygon Mainnet
      chainName: 'Polygon Mainnet',
      rpcUrls: ['https://polygon-rpc.com'],
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      blockExplorerUrls: ['https://polygonscan.com']
    },
    mumbai: {
      chainId: '0x13881', // Polygon Mumbai Testnet
      chainName: 'Polygon Mumbai Testnet',
      rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      blockExplorerUrls: ['https://mumbai.polygonscan.com']
    }
  },
  
  // Smart contract configurations
  contracts: {
    // Example user profile contract
    UserProfile: {
      address: '0x0000000000000000000000000000000000000000', // Replace with actual contract address
      abi: [
        // Example ABI (replace with actual ABI)
        {
          "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
          "name": "getUserProfile",
          "outputs": [{"internalType": "string", "name": "profileData", "type": "string"}],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "string", "name": "profileData", "type": "string"}],
          "name": "updateUserProfile",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ]
    },
    
    // Digital Journal contract for storing journal entry hashes
    DigitalJournal: {
      address: '0x0000000000000000000000000000000000000000', // Replace with actual contract address
      abi: [
        // Example ABI (replace with actual ABI)
        {
          "inputs": [{"internalType": "string", "name": "entryHash", "type": "string"}],
          "name": "storeJournalEntryHash",
          "outputs": [{"internalType": "uint256", "name": "timestamp", "type": "uint256"}],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
          "name": "getJournalEntries",
          "outputs": [{"internalType": "string[]", "name": "entryHashes", "type": "string[]"}],
          "stateMutability": "view",
          "type": "function"
        }
      ]
    }
  }
};