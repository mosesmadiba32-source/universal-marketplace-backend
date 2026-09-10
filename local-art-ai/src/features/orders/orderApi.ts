import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, Order, PaginatedResult } from '../../shared/types/api';

export const orderApi = {
  getOrders: async (params: { page?: number; limit?: number } = {}) => {
    const res = await apiClient.get<ApiResponse<{ orders: Order[]; pagination: PaginatedResult<Order>['pagination'] }>>(
      '/api/orders',
      { params }
    );
    return res.data.data;
  },

  getOrderById: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Order>>(`/api/orders/${id}`);
    return res.data.data;
  },

  cancelOrder: async (id: string) => {
    const res = await apiClient.patch<ApiResponse<Order>>(`/api/orders/${id}/cancel`);
    return res.data.data;
  },
};
