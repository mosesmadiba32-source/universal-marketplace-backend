import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, ProfileStats, User } from '../../shared/types/api';

export const profileApi = {
  getProfile: async () => {
    const res = await apiClient.get<ApiResponse<User>>('/api/profile');
    return res.data.data;
  },

  updateProfile: async (data: { firstName: string; lastName: string; phone?: string | null }) => {
    const res = await apiClient.patch<ApiResponse<User>>('/api/profile', data);
    return res.data.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const res = await apiClient.patch<ApiResponse<{ message: string }>>('/api/profile/password', data);
    return res.data;
  },

  getStats: async () => {
    const res = await apiClient.get<ApiResponse<ProfileStats>>('/api/profile/stats');
    return res.data.data;
  },
};
