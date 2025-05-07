import App from './App';
import { createBrowserRouter } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { authRoutes } from '../auth/router/authRoutes'
import { requestsRoutes } from '../requests/requestsRoutes';
import { ProtectedRoute } from '../shared/routes/ProtectedRoutes';
import ThemeToggle from '../shared/components/ThemeToggle';

export const router = createBrowserRouter([
  { 
    element: 
      <main className="bg-gray dark:bg-black-0 flex justify-center items-center h-screen w-full font-bevietnampro font-light">
        <Outlet />
        <ThemeToggle position='left'/>
      </main>,
    children: authRoutes
  },
  {
    element:<ProtectedRoute> 
                <App /> 
            </ProtectedRoute>, 
    children: requestsRoutes
  }
])