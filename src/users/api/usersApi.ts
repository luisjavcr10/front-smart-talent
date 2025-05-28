import { apiClient } from "@/lib/axios/client";
import { USERS_ENDPOINTS } from "./endpoints";

interface UserProps {
    documentNumber: string;
    firstName?: string;
    paternalSurname?: string;
    maternalSurname?: string;
    businessName?: string;
    email: string;
    address: string;
    phone: string;
  }

export const UsersApi = {
    createUser: (payload: UserProps) => apiClient.post(USERS_ENDPOINTS.CREATE_USER, payload),
    getUsers:() => apiClient.get(USERS_ENDPOINTS.LIST_USERS),
    updateUser: (id: number, payload: UserProps) => apiClient.put(USERS_ENDPOINTS.UPDATE_USER.replace(':id',`${id}`), payload),
} as const;