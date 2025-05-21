import App from './App';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { authRoutes } from '../auth/router/authRoutes';
import { userRoutes } from '@/users/router/userRoutes';
import { requestsRoutes } from '@/requests/router/requestsRoutes';
import { LayoutAuth } from '../auth/components/shared/LayoutAuth';
import { ProtectedAuthRoutes } from '../auth/router/protetedRoutes';
import { ProtectedRoute } from '../shared/routes/ProtectedRoutes';
import { NotFoundPage } from '../errors/pages/NotFoundPage';

// Define proper types for route and roles
type Role = string;
type RouteConfig = {
  element: React.ReactNode;
  roles?: Role[];
  [key: string]: any;
};

const withRoleProtection = (element: React.ReactNode, roles?: Role[]) => (
  <ProtectedRoute roles={roles}>{element}</ProtectedRoute>
);

const applyRouteProtection = (routes: RouteConfig[]) => 
  routes.map(route => ({
    ...route,
    element: route.roles 
      ? withRoleProtection(route.element, route.roles)
      : route.element
  }));

const protectedUserRoutes = applyRouteProtection(userRoutes);
const protectedRequestsRoutes = applyRouteProtection(requestsRoutes);

export const router = createBrowserRouter([
  {
    element:
      <ProtectedAuthRoutes>
        <LayoutAuth>
          <Outlet />
        </LayoutAuth>
      </ProtectedAuthRoutes>,
    children: authRoutes
  },
  {
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      ...protectedUserRoutes,
      ...protectedRequestsRoutes
    ]
  },
  {
    path: '/*',
    element: <NotFoundPage />
  }
]);