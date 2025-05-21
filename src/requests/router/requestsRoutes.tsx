import { RequestsListPage } from "../pages/RequestsListPage";
import { RequestsCreationPage } from "../pages/RequestsCreationPage";
import { ROLES } from "@/auth/constants/roles";

export const requestsRoutes = [
  {
    path: '/requests',
    element: <RequestsListPage />,
    roles: [ROLES.ADMIN, ROLES.USER]
  },
  {
    path: '/requests/create',
    element: <RequestsCreationPage />,
    roles: [ROLES.USER]
  }
];