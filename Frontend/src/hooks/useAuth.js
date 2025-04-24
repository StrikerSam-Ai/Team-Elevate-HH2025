import { useEffect } from 'react';
import { useApi } from './useApi';
import { authAPI } from '../api/auth';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const { loading, error, execute: checkAuth } = useApi(authAPI.checkAuth);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuth();
        if (data.authenticated) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login(email, password);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await authAPI.register(userData);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user data even if API call fails
      setUser(null);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};