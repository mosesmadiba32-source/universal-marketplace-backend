import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from './orderApi';
import { useAuthStore } from '../../shared/store/authStore';
import { useUiStore } from '../../shared/store/uiStore';

export function useOrders(params: { page?: number; limit?: number } = {}) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => orderApi.getOrders(params),
    enabled: isAuthenticated,
  });
}

export function useOrder(id: string | undefined) {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['order', id],
    queryFn: () => (id ? orderApi.getOrderById(id) : Promise.reject('No ID')),
    enabled: Boolean(id) && isAuthenticated,
  });
}

export function useOrderMutations() {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const cancelOrderMutation = useMutation({
    mutationFn: (id: string) => orderApi.cancelOrder(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', data.id] });
      addToast({
        type: 'info',
        title: 'Order Cancelled',
        message: `Order #${data.orderNumber} has been cancelled.`,
      });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Cancellation Failed',
        message: error.response?.data?.message || 'Order cannot be cancelled in its current state.',
      });
    },
  });

  return {
    cancelOrder: cancelOrderMutation.mutate,
    isCancelling: cancelOrderMutation.isPending,
  };
}
