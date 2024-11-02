// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { token, role } = useAuth();

  if (!token || (roleRequired && role !== roleRequired)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
