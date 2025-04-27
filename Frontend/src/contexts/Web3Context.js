import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers, BrowserProvider, Contract } from 'ethers';
import { BLOCKCHAIN_CONFIG } from '../config/blockchain';
import { useToast } from './ToastContext';

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [contracts, setContracts] = useState({});
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const { addToast } = useToast();

  // Initialize blockchain connection
  useEffect(() => {
    const initializeBlockchain = async () => {
      try {
        // Check if ethereum is available (metamask, etc)
        if (window.ethereum) {
          // Create provider
          const provider = new BrowserProvider(window.ethereum);
          setProvider(provider);

          // Listen for account changes
          window.ethereum.on('accountsChanged', handleAccountsChanged);
          
          // Listen for chain changes
          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });

          // Set initial values
          const network = await provider.getNetwork();
          setNetwork(network);

          // Initialize contracts
          initializeContracts(provider);

          setLoading(false);
        } else {
          setLoading(false);
          console.log('No Ethereum wallet detected');
        }
      } catch (error) {
        console.error('Error initializing blockchain:', error);
        setLoading(false);
      }
    };

    initializeBlockchain();

    // Cleanup listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount(null);
      setSigner(null);
      setIsConnected(false);
    } else if (accounts[0] !== account) {
      // Account changed, update the state
      setAccount(accounts[0]);
      if (provider) {
        const signer = await provider.getSigner();
        setSigner(signer);
        setIsConnected(true);
      }
    }
  };

  const initializeContracts = (provider) => {
    const contractInstances = {};
    
    // Check if contract configs exist
    if (BLOCKCHAIN_CONFIG && BLOCKCHAIN_CONFIG.contracts) {
      // Initialize each contract
      Object.entries(BLOCKCHAIN_CONFIG.contracts).forEach(([name, config]) => {
        if (config.address && config.abi) {
          contractInstances[name] = new Contract(
            config.address,
            config.abi,
            provider
          );
        }
      });
    }
    
    setContracts(contractInstances);
  };

  const connectWallet = async () => {
    if (!provider) {
      addToast('No Ethereum wallet detected. Please install MetaMask.', 'error');
      return;
    }

    try {
      setLoading(true);
      
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const signer = await provider.getSigner();
        setSigner(signer);
        setIsConnected(true);
        
        // Check if we're on the right network
        const network = await provider.getNetwork();
        setNetwork(network);
        
        // Reinitialize contracts with signer
        initializeContractsWithSigner(signer);
        
        addToast('Wallet connected successfully!', 'success');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      addToast(error.message || 'Failed to connect wallet', 'error');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setSigner(null);
    setIsConnected(false);
    addToast('Wallet disconnected', 'info');
  };

  const switchNetwork = async (networkConfig) => {
    if (!provider) {
      addToast('No Ethereum wallet detected', 'error');
      return;
    }

    try {
      setLoading(true);
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConfig.chainId }]
      });
      addToast(`Switched to ${networkConfig.chainName}`, 'success');
    } catch (error) {
      // If the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkConfig]
          });
        } catch (addError) {
          console.error('Error adding network:', addError);
          addToast('Failed to add network', 'error');
        }
      } else {
        console.error('Error switching network:', error);
        addToast('Failed to switch network', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const initializeContractsWithSigner = (signer) => {
    const signedContracts = {};
    
    Object.entries(contracts).forEach(([name, contract]) => {
      signedContracts[name] = contract.connect(signer);
    });
    
    setContracts(signedContracts);
  };

  return (
    <Web3Context.Provider value={{
      provider,
      signer,
      account,
      network,
      contracts,
      loading,
      isConnected,
      connectWallet,
      disconnectWallet,
      switchNetwork
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};