export const BLOCKCHAIN_CONFIG = {
  baseNetwork: {
    mainnet: {
      chainId: '0x2105',
      chainName: 'Base',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://mainnet.base.org'],
      blockExplorerUrls: ['https://basescan.org']
    },
    testnet: {
      chainId: '0x14a33',
      chainName: 'Base Goerli',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://goerli.base.org'],
      blockExplorerUrls: ['https://goerli.basescan.org']
    }
  },
  contracts: {
    JournalRegistry: {
      address: process.env.REACT_APP_JOURNAL_CONTRACT_ADDRESS,
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'author',
              type: 'address'
            },
            {
              indexed: true,
              internalType: 'string',
              name: 'ipfsHash',
              type: 'string'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'timestamp',
              type: 'uint256'
            }
          ],
          name: 'JournalEntryCreated',
          type: 'event'
        },
        {
          inputs: [
            {
              internalType: 'string',
              name: '_ipfsHash',
              type: 'string'
            }
          ],
          name: 'createJournalEntry',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: '_author',
              type: 'address'
            }
          ],
          name: 'getJournalEntries',
          outputs: [
            {
              components: [
                {
                  internalType: 'string',
                  name: 'ipfsHash',
                  type: 'string'
                },
                {
                  internalType: 'uint256',
                  name: 'timestamp',
                  type: 'uint256'
                }
              ],
              internalType: 'struct JournalRegistry.Entry[]',
              name: '',
              type: 'tuple[]'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ]
    }
  },
  ipfs: {
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  }
};