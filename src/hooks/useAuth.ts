// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
};

export default useAuth;
