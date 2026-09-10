import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, Cart } from '../../shared/types/api';

export const cartApi = {
  getCart: async () => {
    const res = await apiClient.get<ApiResponse<Cart>>('/api/cart');
    return res.data.data;
  },

  addItem: async (item: { productId: string; variantId?: string | null; quantity: number }) => {
    const res = await apiClient.post<ApiResponse<Cart>>('/api/cart/items', item);
    return res.data.data;
  },

  updateItem: async (itemId: string, quantity: number) => {
    const res = await apiClient.patch<ApiResponse<Cart>>(`/api/cart/items/${itemId}`, { quantity });
    return res.data.data;
  },

  removeItem: async (itemId: string) => {
    const res = await apiClient.delete<ApiResponse<Cart>>(`/api/cart/items/${itemId}`);
    return res.data.data;
  },

  clearCart: async () => {
    const res = await apiClient.delete<ApiResponse<Cart>>('/api/cart');
    return res.data.data;
  },
};
