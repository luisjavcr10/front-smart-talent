import { Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { useHasRole } from '@/auth/hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string | string[]; 
  redirectTo?: string; 
}

export const ProtectedRoute = ({ 
  children, 
  roles, 
  redirectTo = '/unauthorized' 
}: ProtectedRouteProps) => {
  const token = storage.getToken();
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles) {
    const hasRequiredRole = useHasRole(roles);
    if (!hasRequiredRole) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};