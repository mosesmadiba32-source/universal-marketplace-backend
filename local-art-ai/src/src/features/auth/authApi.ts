import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, User } from '../../shared/types/api';

export interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/api/auth/login', credentials);
    return res.data.data;
  },

  register: async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/api/auth/register', data);
    return res.data.data;
  },

  getCurrentUser: async () => {
    const res = await apiClient.get<ApiResponse<User>>('/api/auth/me');
    return res.data.data;
  },

  logout: async (refreshToken?: string | null) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>('/api/auth/logout', {
      refreshToken,
    });
    return res.data;
  },

  forgotPassword: async (email: string) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>('/api/auth/forgot-password', {
      email,
    });
    return res.data;
  },

  resetPassword: async (data: { token: string; password: string }) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>('/api/auth/reset-password', data);
    return res.data;
  },

  verifyEmail: async (token: string) => {
    const res = await apiClient.post<ApiResponse<{ message: string }>>('/api/auth/verify-email', {
      token,
    });
    return res.data;
  },
};
