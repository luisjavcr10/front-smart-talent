import { CreateUserPage } from "../pages/CreateUserPage";
import { ListUsersPage } from "../pages/ListUsersPage";

export const userRoutes = [
  {
    path: '/users',
    element: <ListUsersPage />,
  },
  {
    path: '/users/create',
    element: <CreateUserPage />,
  }
];