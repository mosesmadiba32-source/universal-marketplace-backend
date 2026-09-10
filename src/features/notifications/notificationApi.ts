import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, Notification, PaginatedResult } from '../../shared/types/api';

export const notificationApi = {
  getNotifications: async (params: { page?: number; limit?: number; unread?: boolean } = {}) => {
    const res = await apiClient.get<
      ApiResponse<{
        notifications: Notification[];
        unreadCount: number;
        pagination: PaginatedResult<Notification>['pagination'];
      }>
    >('/api/notifications', { params });
    return res.data.data;
  },

  markRead: async (id: string) => {
    const res = await apiClient.patch<ApiResponse<Notification>>(`/api/notifications/${id}/read`);
    return res.data.data;
  },

  markAllRead: async () => {
    const res = await apiClient.patch<
      ApiResponse<{
        notifications: Notification[];
        unreadCount: number;
        pagination: PaginatedResult<Notification>['pagination'];
      }>
    >('/api/notifications/read-all');
    return res.data.data;
  },

  deleteNotification: async (id: string) => {
    await apiClient.delete(`/api/notifications/${id}`);
  },
};
