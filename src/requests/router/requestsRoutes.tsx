import { RequestsListPage } from "../pages/RequestsListPage";
import { RequestsCreationPage } from "../pages/RequestsCreationPage";

export const requestsRoutes = [
  {
    path: '/requests',
    element: <RequestsListPage />,
  },
  {
    path:'/requests/create',
    element: <RequestsCreationPage />
  },
  {
    path:'/'
  }
];