import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from './wishlistApi';
import { useAuthStore } from '../../shared/store/authStore';
import { useUiStore } from '../../shared/store/uiStore';

export function useWishlist() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistApi.getWishlist,
    enabled: isAuthenticated,
  });
}

export function useWishlistMutations() {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const addItemMutation = useMutation({
    mutationFn: wishlistApi.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      addToast({
        type: 'success',
        title: 'Added to Wishlist',
        message: 'Item saved to your favorites.',
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: wishlistApi.removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
      });
    },
  });

  const clearWishlistMutation = useMutation({
    mutationFn: wishlistApi.clearWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      addToast({
        type: 'info',
        title: 'Wishlist Cleared',
      });
    },
  });

  return {
    addItem: addItemMutation.mutate,
    isAdding: addItemMutation.isPending,
    removeItem: removeItemMutation.mutate,
    isRemoving: removeItemMutation.isPending,
    clearWishlist: clearWishlistMutation.mutate,
  };
}
