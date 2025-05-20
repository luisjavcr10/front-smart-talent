import type { AxiosInstance } from 'axios';

export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(config => {
    // Añadir token de autenticación
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      // Manejo global de errores
      if (error.response?.status === 401) {
        // Redirigir a login si no está autorizado
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}