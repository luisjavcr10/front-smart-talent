import App from './App';
import { createBrowserRouter } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { authRoutes } from '../auth/authRoutes'
import { requestsRoutes } from '../requests/requestsRoutes';

export const router = createBrowserRouter([
  { 
    element: 
      <main className="bg-gray dark:bg-black-0 flex justify-center items-center h-screen w-full font-bevietnampro font-light">
        <Outlet />
      </main>,
    children: authRoutes
  },
  {
    element: <App />, 
    children: requestsRoutes
  }
])