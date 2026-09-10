import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, Review, ReviewStats, PaginatedResult } from '../../shared/types/api';

export interface CreateReviewPayload {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}

export const reviewApi = {
  getProductReviews: async (productId: string, params: { page?: number; limit?: number; sort?: string } = {}) => {
    const res = await apiClient.get<ApiResponse<{ reviews: Review[]; pagination: PaginatedResult<Review>['pagination'] }>>(
      `/api/reviews/product/${productId}`,
      { params }
    );
    return res.data.data;
  },

  getReviewStats: async (productId: string) => {
    const res = await apiClient.get<ApiResponse<ReviewStats>>(`/api/reviews/product/${productId}/stats`);
    return res.data.data;
  },

  createReview: async (data: CreateReviewPayload) => {
    const res = await apiClient.post<ApiResponse<Review>>('/api/reviews', data);
    return res.data.data;
  },

  updateReview: async (id: string, data: Partial<CreateReviewPayload>) => {
    const res = await apiClient.patch<ApiResponse<Review>>(`/api/reviews/${id}`, data);
    return res.data.data;
  },

  deleteReview: async (id: string) => {
    const res = await apiClient.delete<ApiResponse<Review>>(`/api/reviews/${id}`);
    return res.data.data;
  },
};
