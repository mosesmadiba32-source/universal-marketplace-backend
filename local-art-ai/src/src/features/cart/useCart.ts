import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from './cartApi';
import { useAuthStore } from '../../shared/store/authStore';
import { useUiStore } from '../../shared/store/uiStore';

export function useCart() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['cart'],
    queryFn: cartApi.getCart,
    enabled: isAuthenticated,
  });
}

export function useCartMutations() {
  const queryClient = useQueryClient();
  const { addToast, openCartDrawer } = useUiStore();

  const addItemMutation = useMutation({
    mutationFn: cartApi.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast({
        type: 'success',
        title: 'Added to Cart',
        message: 'Item has been added to your shopping bag.',
      });
      openCartDrawer();
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Could Not Add Item',
        message: error.response?.data?.message || 'Item stock is unavailable or invalid.',
      });
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: error.response?.data?.message || 'Unable to update item quantity.',
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: cartApi.removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast({
        type: 'info',
        title: 'Item Removed',
        message: 'Item removed from your cart.',
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast({
        type: 'info',
        title: 'Cart Cleared',
      });
    },
  });

  return {
    addItem: addItemMutation.mutate,
    isAdding: addItemMutation.isPending,
    updateItem: updateItemMutation.mutate,
    isUpdating: updateItemMutation.isPending,
    removeItem: removeItemMutation.mutate,
    isRemoving: removeItemMutation.isPending,
    clearCart: clearCartMutation.mutate,
    isClearing: clearCartMutation.isPending,
  };
}
