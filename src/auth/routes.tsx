import { LoginPage } from './pages/LoginPage';

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <div>Register Page</div>, // Reemplaza con tu componente
  },
];