import { apiClient } from '../../shared/lib/apiClient';
import { ApiResponse, Category, PaginatedResult, Product, SearchResult } from '../../shared/types/api';

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string; // slug
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface SearchQueryParams {
  q?: string;
  page?: number;
  limit?: number;
  category?: string;
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  stock?: boolean;
  rating?: number;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'popular';
}

export const catalogApi = {
  getProducts: async (params: ProductQueryParams = {}) => {
    const res = await apiClient.get<ApiResponse<{ products: Product[]; pagination: PaginatedResult<Product>['pagination'] }>>(
      '/api/products',
      { params }
    );
    return res.data.data;
  },

  getProductById: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`);
    return res.data.data;
  },

  recordProductView: async (productId: string) => {
    try {
      await apiClient.post(`/api/products/${productId}/view`);
    } catch {
      // Non-critical tracking
    }
  },

  getCategories: async (params: { page?: number; limit?: number; search?: string } = {}) => {
    const res = await apiClient.get<ApiResponse<{ categories: Category[]; pagination: PaginatedResult<Category>['pagination'] }>>(
      '/api/categories',
      { params }
    );
    return res.data.data;
  },

  getCategoryBySlug: async (slug: string) => {
    const res = await apiClient.get<ApiResponse<{ category: Category; products: Product[]; productCount: number }>>(
      `/api/categories/slug/${slug}`
    );
    return res.data.data;
  },

  search: async (params: SearchQueryParams) => {
    const res = await apiClient.get<ApiResponse<SearchResult>>('/api/search', { params });
    return res.data.data;
  },

  getTrendingProducts: async (limit = 8) => {
    const res = await apiClient.get<ApiResponse<Product[]>>('/api/recommendations/trending', {
      params: { limit },
    });
    return res.data.data;
  },

  getSimilarProducts: async (productId: string) => {
    const res = await apiClient.get<ApiResponse<Product[]>>(`/api/recommendations/similar/${productId}`);
    return res.data.data;
  },

  getRecentlyViewed: async () => {
    const res = await apiClient.get<ApiResponse<Product[]>>('/api/recommendations/recently-viewed');
    return res.data.data;
  },

  getAutocomplete: async (q: string) => {
    const res = await apiClient.get<ApiResponse<Array<{ id: string; name: string; slug: string; sku: string }>>>(
      '/api/recommendations/autocomplete',
      { params: { q } }
    );
    return res.data.data;
  },
};
