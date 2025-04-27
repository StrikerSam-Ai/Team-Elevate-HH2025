import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../LoadingSpinner';
import { PATHS } from '../../config/paths';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // Save the attempted url for redirecting after login
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;