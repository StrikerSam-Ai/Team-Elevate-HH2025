import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';  // Use the configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('/check-auth/');
      if (response.status === 200 && response.data.authenticated) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/login/', 
        { email, password }
      );

      if (response.status === 200) {
        await checkAuthStatus();  // Refresh user state after login
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/logout/');
      if (response.status === 200) {
        setUser(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/register/', userData);
      
      if (response.status === 201) {
        await checkAuthStatus();  // Refresh user state after registration
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    checkAuthStatus,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);