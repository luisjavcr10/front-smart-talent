import { apiClient } from '../../lib/axios/client';
import { AUTH_ENDPOINTS } from './endpoints';

type LoginPayload = {
    email : string,
    password: string
}

interface LoginResponse {
    message: string;
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string[];
    };
  }

export const AuthApi = {
  login: (payload: LoginPayload) => 
    apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, payload),
};