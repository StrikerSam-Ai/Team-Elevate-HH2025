import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';

export const useApi = (apiFunction, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  const { 
    showSuccessToast = false, 
    showErrorToast = true,
    successMessage,
    transformResponse
  } = options;

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(...args);
      const data = transformResponse ? transformResponse(response) : response.data;
      
      if (showSuccessToast) {
        addToast(successMessage || 'Operation successful', 'success');
      }
      
      return data;
    } catch (err) {
      setError(err);
      if (showErrorToast) {
        addToast(err.message || 'An error occurred', 'error');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, showSuccessToast, showErrorToast, successMessage, transformResponse, addToast]);

  return {
    loading,
    error,
    execute
  };
};