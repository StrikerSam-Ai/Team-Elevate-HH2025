import React, { createContext, useContext, useState, useEffect } from 'react';
import { blockchainService } from '../services/blockchainService';
import { useToast } from './ToastContext';

const Web3Context = createContext(null);

export const Web3Provider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    checkConnection();
    addWalletListeners();
  }, []);

  const checkConnection = async () => {
    try {
      await blockchainService.initialize();
      const signer = blockchainService.signer;
      if (signer) {
        const address = await signer.getAddress();
        setAddress(address);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Connection check failed:', error);
      setIsConnected(false);
      setAddress(null);
    }
  };

  const addWalletListeners = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('disconnect', handleDisconnect);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      setAddress(null);
      addToast('Wallet disconnected', 'warning');
    } else {
      setAddress(accounts[0]);
      setIsConnected(true);
      addToast('Wallet connected', 'success');
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress(null);
    addToast('Wallet disconnected', 'warning');
  };

  const connectWallet = async () => {
    try {
      await blockchainService.initialize();
      const signer = blockchainService.signer;
      const address = await signer.getAddress();
      setAddress(address);
      setIsConnected(true);
      addToast('Wallet connected successfully', 'success');
    } catch (error) {
      console.error('Connection failed:', error);
      addToast('Failed to connect wallet', 'error');
      setIsConnected(false);
      setAddress(null);
    }
  };

  const value = {
    isConnected,
    address,
    isCorrectNetwork,
    connectWallet
  };

  return (
    <Web3Context.Provider value={value}>
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