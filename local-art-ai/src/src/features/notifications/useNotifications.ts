import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from './notificationApi';
import { useAuthStore } from '../../shared/store/authStore';

export function useNotifications(params: { page?: number; limit?: number; unread?: boolean } = {}) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['notifications', params],
    queryFn: () => notificationApi.getNotifications(params),
    enabled: isAuthenticated,
  });
}

export function useNotificationMutations() {
  const queryClient = useQueryClient();

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationApi.markRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: (id: string) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return {
    markRead: markReadMutation.mutate,
    markAllRead: markAllReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
  };
}
