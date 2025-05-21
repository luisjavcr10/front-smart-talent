import { Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { useHasRole, useUser } from '@/auth/hooks/useUser';

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
  const { user } = useUser();
  
  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si se requieren roles pero el usuario aún no está cargado, mostrar un indicador de carga
  if (roles && !user) {
    // Puedes mostrar un componente de carga aquí si lo deseas
    return <div>Cargando...</div>;
  }

  // Verificar roles solo si el usuario está cargado
  if (roles && user) {
    const hasRequiredRole = useHasRole(roles);
    if (!hasRequiredRole) {
      return <Navigate to={redirectTo} replace />;
    }
  }

  return <>{children}</>;
};