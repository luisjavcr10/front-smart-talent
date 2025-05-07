import { Navigate } from 'react-router-dom';
import { storage } from '../../shared/utils/storage';

export const ProtectedAuthRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = storage.getToken();
  
  if (token) {
    return <Navigate to="/requests" replace />;
  }

  return <>{children}</>;
};