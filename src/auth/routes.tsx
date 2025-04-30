import { LoginPage } from './pages/LoginPage';
import { RecoveryPasswordPage } from './pages/RecoveryPasswordPage';
import { ResetPassword } from './pages/ResetPassword';

export const authRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/recovery-password',
    element: <RecoveryPasswordPage />, 
  },
  {
    path:'/reset-password',
    element: <ResetPassword />
  }
];