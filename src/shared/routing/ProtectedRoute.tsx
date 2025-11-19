// src/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthInfo from '../../features/auth/hooks/useAuthInfo';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, canAccessAdmin } = useAuthInfo();

  // não logado → manda pro login de admin
  if (!isAuthenticated) {
    return <Navigate to="/login-admin" replace />;
  }

  // logado, mas não tem permissão de admin (é CLIENTE) → manda pra home pública
  if (!canAccessAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
