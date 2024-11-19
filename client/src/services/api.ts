import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// Intercepts requests to add the Authorization token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepts responses to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refreshToken')
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken,
        });
        localStorage.setItem('token', response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Authentication-related API calls
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('token/', credentials),
  refreshToken: (refreshToken: string) =>
    api.post('token/refresh/', { refresh: refreshToken }),
};

// User-related API calls
export const userAPI = {
  fetchAllUsers: () => api.get('users/'), // Admin-only
  fetchUserById: (id: number) => api.get(`users/${id}/`),
  createUser: (userData: any) => api.post('users/create/', userData),
  updateUser: (id: number, userData: any) => api.patch(`users/${id}/update/`, userData),
  deleteUser: (id: number) => api.delete(`users/${id}/delete/`),
};
