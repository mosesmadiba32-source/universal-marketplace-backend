import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi, CreateReviewPayload } from './reviewApi';
import { useUiStore } from '../../shared/store/uiStore';

export function useProductReviews(productId: string | undefined, params: { page?: number; limit?: number; sort?: string } = {}) {
  return useQuery({
    queryKey: ['reviews', productId, params],
    queryFn: () => (productId ? reviewApi.getProductReviews(productId, params) : Promise.reject('No ID')),
    enabled: Boolean(productId),
  });
}

export function useProductReviewStats(productId: string | undefined) {
  return useQuery({
    queryKey: ['reviews', 'stats', productId],
    queryFn: () => (productId ? reviewApi.getReviewStats(productId) : Promise.reject('No ID')),
    enabled: Boolean(productId),
  });
}

export function useReviewMutations(productId?: string) {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const createReviewMutation = useMutation({
    mutationFn: (data: CreateReviewPayload) => reviewApi.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      addToast({
        type: 'success',
        title: 'Review Submitted',
        message: 'Thank you! Your verified review has been submitted for moderation.',
      });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Review Submission Failed',
        message:
          error.response?.data?.message ||
          'Only verified purchasers with delivered orders can submit a review.',
      });
    },
  });

  return {
    createReview: createReviewMutation.mutateAsync,
    isSubmitting: createReviewMutation.isPending,
  };
}
