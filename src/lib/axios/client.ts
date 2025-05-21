import axios from 'axios';
import { setupInterceptors } from './interceptors';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  //timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
  withCredentials: false,
});

// Configurar interceptores
setupInterceptors(apiClient);