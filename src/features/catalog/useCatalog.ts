import { useQuery } from '@tanstack/react-query';
import { catalogApi, ProductQueryParams, SearchQueryParams } from './catalogApi';

export function useProducts(params: ProductQueryParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => catalogApi.getProducts(params),
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => (id ? catalogApi.getProductById(id) : Promise.reject('No ID')),
    enabled: Boolean(id),
  });
}

export function useCategories(params: { page?: number; limit?: number; search?: string } = {}) {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => catalogApi.getCategories(params),
  });
}

export function useCategoryBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => (slug ? catalogApi.getCategoryBySlug(slug) : Promise.reject('No slug')),
    enabled: Boolean(slug),
  });
}

export function useSearch(params: SearchQueryParams) {
  return useQuery({
    queryKey: ['search', params],
    queryFn: () => catalogApi.search(params),
  });
}

export function useTrendingProducts(limit = 8) {
  return useQuery({
    queryKey: ['products', 'trending', limit],
    queryFn: () => catalogApi.getTrendingProducts(limit),
  });
}

export function useSimilarProducts(productId: string | undefined) {
  return useQuery({
    queryKey: ['products', 'similar', productId],
    queryFn: () => (productId ? catalogApi.getSimilarProducts(productId) : Promise.resolve([])),
    enabled: Boolean(productId),
  });
}
