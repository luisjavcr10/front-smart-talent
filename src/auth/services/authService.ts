import { AuthApi } from '../api/authApi';
import { storage } from '../../shared/utils/storage';

export const AuthService = {
  async login(email: string, password: string) {
    try {
      const { data } = await AuthApi.login({ email, password });
      console.log(data);
      storage.setToken(data.data.jwt);
      return data.data.jwt;
    } catch (error) {
      throw new Error('Login failed');
    }
  },

};