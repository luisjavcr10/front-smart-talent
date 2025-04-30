import { LoginPage } from './pages/LoginPage';
import {RegisterPage} from './pages/RegisterPage';
import { RecoveryPasswordPage } from './pages/RecoveryPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/recovery-password',
    element: <RecoveryPasswordPage />, 
  },
  {
    path:'/reset-password',
    element: <ResetPasswordPage />
  }
];