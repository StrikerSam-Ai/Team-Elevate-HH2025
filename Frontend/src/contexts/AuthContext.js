import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { useToast } from './ToastContext';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { addToast } = useToast();

  const checkAuthStatus = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      
      const response = await authService.checkAuth();
      if (response && response.authenticated) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth events from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEYS.AUTH_TOKEN) {
        checkAuthStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth:logout', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:logout', checkAuthStatus);
    };
  }, [checkAuthStatus]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      addToast('Login successful!', 'success');
      return response;
    } catch (error) {
      addToast(error.message || 'Login failed. Please try again.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      setIsAuthenticated(true);
      addToast('Registration successful!', 'success');
      return response;
    } catch (error) {
      addToast(error.message || 'Registration failed. Please try again.', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      addToast('You have been logged out successfully', 'info');
    } catch (error) {
      console.error('Logout error:', error);
      addToast('Logout failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      updateUser,
      checkAuthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};