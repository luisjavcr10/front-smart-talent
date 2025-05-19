import { AuthApi } from '../api/authApi';

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

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data } = await AuthApi.login({ email, password });
      return data;
    } catch (error) {
      throw new Error('Login failed');
    }
  },
};
