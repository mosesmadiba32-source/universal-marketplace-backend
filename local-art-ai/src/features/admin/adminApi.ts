import { apiClient } from '../../shared/lib/apiClient';
import {
  ApiResponse,
  Category,
  Coupon,
  InventoryLog,
  Order,
  OrderStatus,
  PaginatedResult,
  Product,
  Review,
  ReviewStatus,
} from '../../shared/types/api';

export const adminApi = {
  // Products
  createProduct: async (data: Record<string, unknown>) => {
    const res = await apiClient.post<ApiResponse<Product>>('/api/products', data);
    return res.data.data;
  },

  updateProduct: async (id: string, data: Record<string, unknown>) => {
    const res = await apiClient.patch<ApiResponse<Product>>(`/api/products/${id}`, data);
    return res.data.data;
  },

  deleteProduct: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Product>>(`/api/products/${id}`);
    return res.data.data;
  },

  // Image Upload
  uploadImage: async (file: File, kind: 'avatars' | 'products' | 'categories') => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await apiClient.post<ApiResponse<{ filename: string; path: string }>>(
      `/api/uploads/${kind === 'products' ? 'product' : kind === 'categories' ? 'category' : 'avatar'}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return res.data.data;
  },

  // Categories
  createCategory: async (data: { name: string; slug: string; description?: string }) => {
    const res = await apiClient.post<ApiResponse<Category>>('/api/categories', data);
    return res.data.data;
  },

  deleteCategory: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Category>>(`/api/categories/${id}`);
    return res.data.data;
  },

  // Inventory
  adjustStock: async (data: {
    productId: string;
    variantId?: string | null;
    action: 'INCREASE' | 'DECREASE';
    quantity: number;
    reason: string;
  }) => {
    const res = await apiClient.post<ApiResponse<InventoryLog>>('/api/inventory/adjust', data);
    return res.data.data;
  },

  reserveStock: async (data: {
    productId: string;
    variantId?: string | null;
    quantity: number;
    reason: string;
  }) => {
    const res = await apiClient.post<ApiResponse<InventoryLog>>('/api/inventory/reserve', data);
    return res.data.data;
  },

  releaseStock: async (data: {
    productId: string;
    variantId?: string | null;
    quantity: number;
    reason: string;
  }) => {
    const res = await apiClient.post<ApiResponse<InventoryLog>>('/api/inventory/release', data);
    return res.data.data;
  },

  getInventoryLogs: async (params: { page?: number; limit?: number; productId?: string; variantId?: string } = {}) => {
    const res = await apiClient.get<
      ApiResponse<{
        logs: InventoryLog[];
        pagination: PaginatedResult<InventoryLog>['pagination'];
      }>
    >('/api/inventory/logs', { params });
    return res.data.data;
  },

  // Orders
  getAdminOrders: async (params: { page?: number; limit?: number } = {}) => {
    const res = await apiClient.get<
      ApiResponse<{
        orders: Order[];
        pagination: PaginatedResult<Order>['pagination'];
      }>
    >('/api/orders', { params });
    return res.data.data;
  },

  updateOrderStatus: async (id: string, status: OrderStatus) => {
    const res = await apiClient.patch<ApiResponse<Order>>(`/api/orders/${id}/status`, { status });
    return res.data.data;
  },

  // Reviews Moderation Queue
  getAdminReviews: async (params: { page?: number; limit?: number; status?: ReviewStatus } = {}) => {
    const res = await apiClient.get<
      ApiResponse<{
        reviews: Review[];
        pagination: PaginatedResult<Review>['pagination'];
      }>
    >('/api/reviews', { params });
    return res.data.data;
  },

  updateReviewStatus: async (id: string, status: ReviewStatus) => {
    const res = await apiClient.patch<ApiResponse<Review>>(`/api/reviews/${id}/status`, { status });
    return res.data.data;
  },

  // Coupons
  getCoupons: async (params: { page?: number; limit?: number } = {}) => {
    const res = await apiClient.get<
      ApiResponse<{
        coupons: Coupon[];
        pagination: PaginatedResult<Coupon>['pagination'];
      }>
    >('/api/coupons', { params });
    return res.data.data;
  },

  createCoupon: async (data: Record<string, unknown>) => {
    const res = await apiClient.post<ApiResponse<Coupon>>('/api/coupons', data);
    return res.data.data;
  },

  updateCoupon: async (id: string, data: Record<string, unknown>) => {
    const res = await apiClient.patch<ApiResponse<Coupon>>(`/api/coupons/${id}`, data);
    return res.data.data;
  },

  deleteCoupon: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Coupon>>(`/api/coupons/${id}`);
    return res.data.data;
  },
};
