import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants';

const CURRENT_ENV = import.meta.env.VITE_CURRENT_ENV || 'local';

const baseURL =
  CURRENT_ENV === 'prod'
    ? 'https://restaurant-management-xd6i.onrender.com/api/'
    : 'http://localhost:8000/api/';

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem(REFRESH_TOKEN)
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('token/', credentials),
  refreshToken: (refreshToken: string) =>
    api.post('token/refresh/', { refresh: refreshToken }),
};

export const userAPI = {
  fetchAllUsers: () => api.get('users/'),
  fetchUserById: (id: number) => api.get(`users/${id}/`),
  createUser: (userData: any) => api.post('users/create/', userData),
  updateUser: (id: number, userData: any) => api.patch(`users/${id}/update/`, userData),
  deleteUser: (id: number) => api.delete(`users/${id}/delete/`),
};
