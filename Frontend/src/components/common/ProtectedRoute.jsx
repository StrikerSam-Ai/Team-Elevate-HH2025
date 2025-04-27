import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PATHS } from '../../config/paths';

/**
 * A wrapper component for routes that require authentication
 * If user is not authenticated, redirects to login with a return URL
 */
const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={PATHS.LOGIN} 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // If roles are required, check if user has the necessary role
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(
      role => user?.roles?.includes(role)
    );

    if (!hasRequiredRole) {
      return (
        <div className="unauthorized-container">
          <h1>Unauthorized</h1>
          <p>You don't have permission to access this page.</p>
        </div>
      );
    }
  }

  // If authenticated and has required roles (if any), render the children
  return children;
};

export default ProtectedRoute;