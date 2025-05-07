import { Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = storage.getToken();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};