import { AuthApi } from '../api/authApi';

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    entityId: number;
    username: string;
    email: string;
    roles: string[];
  };
}

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse | null> {
    try {
      const { data } = await AuthApi.login({ email, password });
      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        return null;
      }
      throw new Error("Error en el servidor");
    }
  },
};
