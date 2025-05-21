import { ROLES } from "@/auth/constants/roles";
import { CreateUserPage } from "../pages/CreateUserPage";

export const userRoutes = [
  {
    path: '/users/create',
    element: <CreateUserPage />,
    roles: [ROLES.ADMIN]
  }
];