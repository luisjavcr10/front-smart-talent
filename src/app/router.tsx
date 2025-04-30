import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import { authRoutes } from '../auth/routes'
import { Outlet } from 'react-router-dom'

export const router = createBrowserRouter([
  { 
    element: 
      <main className="bg-black-0 flex justify-center items-center h-screen w-full font-bevietnampro font-light">
        <Outlet />
      </main>,
    children: authRoutes
  },
  {
    element: <App />, 
    children:[
        { 
            path: '/', 
            element: <div>
              <h1 className="bg-orange">Este es el sistema para Smart Talent</h1>
            </div> 
        }
    ]
  }
])