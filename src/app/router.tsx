import { createBrowserRouter } from 'react-router-dom'
import App from './App';
import { authRoutes } from '../auth/routes'

export const router = createBrowserRouter([
  { 
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