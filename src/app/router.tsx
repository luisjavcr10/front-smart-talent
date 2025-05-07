import App from './App';
import { createBrowserRouter } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { authRoutes } from '../auth/router/authRoutes'
import { requestsRoutes } from '../requests/requestsRoutes';
import { ProtectedRoute } from '../shared/routes/ProtectedRoutes';
import { ProtectedAuthRoutes } from '../auth/router/protetedRoutes';
import ThemeToggle from '../shared/components/ThemeToggle';

export const router = createBrowserRouter([
  { 
    element: 
    <ProtectedAuthRoutes>
      <main className="bg-gray dark:bg-black-0 flex justify-center items-center h-screen w-full font-bevietnampro font-light">
        <Outlet />
        <ThemeToggle position='left'/>
      </main>,
    </ProtectedAuthRoutes>,
    children: authRoutes
  },
  {
    element:<ProtectedRoute> 
                <App /> 
            </ProtectedRoute>, 
    children: requestsRoutes
  }
])