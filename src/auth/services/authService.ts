import { AuthApi } from '../api/authApi';

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const { data } = await AuthApi.login({ email, password });

      const token = data.data.jwt;
      const user = {
        id: data.data.id,
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
      };

      return { token, user };
    } catch (error) {
      throw new Error('Login failed');
    }
  },
};
