import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressApi, CreateAddressPayload } from './addressApi';
import { useAuthStore } from '../../shared/store/authStore';
import { useUiStore } from '../../shared/store/uiStore';

export function useAddresses() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['addresses'],
    queryFn: addressApi.getAddresses,
    enabled: isAuthenticated,
  });
}

export function useAddressMutations() {
  const queryClient = useQueryClient();
  const { addToast } = useUiStore();

  const createAddressMutation = useMutation({
    mutationFn: addressApi.createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      addToast({
        type: 'success',
        title: 'Address Saved',
        message: 'Delivery address added successfully.',
      });
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Save Failed',
        message: 'Unable to save address.',
      });
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAddressPayload> }) =>
      addressApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      addToast({
        type: 'success',
        title: 'Address Updated',
      });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: addressApi.setDefaultAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      addToast({
        type: 'success',
        title: 'Default Address Updated',
      });
    },
  });

  const deleteAddressMutation = useMutation({
    mutationFn: addressApi.deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      addToast({
        type: 'info',
        title: 'Address Deleted',
      });
    },
  });

  return {
    createAddress: createAddressMutation.mutateAsync,
    isCreating: createAddressMutation.isPending,
    updateAddress: updateAddressMutation.mutateAsync,
    isUpdating: updateAddressMutation.isPending,
    setDefaultAddress: setDefaultMutation.mutate,
    deleteAddress: deleteAddressMutation.mutate,
    isDeleting: deleteAddressMutation.isPending,
  };
}
