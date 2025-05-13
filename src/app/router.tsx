import App from './App';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { authRoutes } from '../auth/router/authRoutes';
import { LayoutAuth } from '../auth/components/shared/LayoutAuth';
import { ProtectedAuthRoutes } from '../auth/router/protetedRoutes';
import { requestsRoutes } from '@/requests/router/requestsRoutes';
import { ProtectedRoute } from '../shared/routes/ProtectedRoutes';
import { NotFoundPage } from '../errors/pages/NotFoundPage';

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
    element:<ProtectedRoute> 
                <App /> 
            </ProtectedRoute>, 
    children: requestsRoutes
  },
  {
    path:'/*',
    element: <NotFoundPage/>

  }
])