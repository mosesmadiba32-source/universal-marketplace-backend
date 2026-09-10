import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, Wishlist } from '../../shared/types/api';

export const wishlistApi = {
  getWishlist: async () => {
    const res = await apiClient.get<ApiResponse<Wishlist>>('/api/wishlist');
    return res.data.data;
  },

  addItem: async (productId: string) => {
    const res = await apiClient.post<ApiResponse<Wishlist>>('/api/wishlist/items', { productId });
    return res.data.data;
  },

  removeItem: async (productId: string) => {
    const res = await apiClient.delete<ApiResponse<Wishlist>>(`/api/wishlist/items/${productId}`);
    return res.data.data;
  },

  clearWishlist: async () => {
    const res = await apiClient.delete<ApiResponse<Wishlist>>('/api/wishlist');
    return res.data.data;
  },
};
