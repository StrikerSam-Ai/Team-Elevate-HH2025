import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(...params);
      setData(response);

      if (options.successMessage) {
        addToast(options.successMessage, 'success');
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      
      if (options.showErrorToast !== false) {
        addToast(errorMessage, 'error');
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, options.successMessage, options.showErrorToast, addToast]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};