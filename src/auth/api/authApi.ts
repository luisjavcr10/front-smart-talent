import { apiClient } from '../../lib/axios/client';
import { AUTH_ENDPOINTS } from './endpoints';

type LoginPayload = {
    email : string,
    password: string
}

type LoginResponse ={
    title: string,
    data: {
        email: string,
        jwt: string
  }
}

export const AuthApi = {
  login: (payload: LoginPayload) => 
    apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, payload),
};