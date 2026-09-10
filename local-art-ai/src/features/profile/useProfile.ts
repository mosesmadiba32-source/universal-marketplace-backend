import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from './profileApi';
import { useAuthStore } from '../../shared/store/authStore';
import { useUiStore } from '../../shared/store/uiStore';

export function useProfile() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
    enabled: isAuthenticated,
  });
}

export function useProfileStats() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ['profile', 'stats'],
    queryFn: profileApi.getStats,
    enabled: isAuthenticated,
  });
}

export function useProfileMutations() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const { addToast } = useUiStore();

  const updateProfileMutation = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your personal information has been saved.',
      });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: error.response?.data?.message || 'Unable to update profile.',
      });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: profileApi.changePassword,
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Password Changed',
        message: 'Your security password has been updated.',
      });
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Password Change Failed',
        message: error.response?.data?.message || 'Current password is incorrect.',
      });
    },
  });

  return {
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    changePassword: changePasswordMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
  };
}
