import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from './authApi';
import { useAuthStore, getStoredRefreshToken } from '../../shared/store/authStore';
import { useUiStore } from '../../shared/store/uiStore';
import { initializeSocket, disconnectSocket } from '../../shared/lib/socket';

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading, sessionTerminatedReason, setAuth, clearAuth } = useAuthStore();
  const { addToast } = useUiStore();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      initializeSocket();
      queryClient.clear();
      addToast({
        type: 'success',
        title: `Welcome back, ${data.user.firstName}!`,
      });
      navigate('/');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Login Failed',
        message: error.response?.data?.message || 'Invalid email or password.',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      initializeSocket();
      queryClient.clear();
      addToast({
        type: 'success',
        title: 'Account Created Successfully',
        message: 'Welcome to Universal Marketplace!',
      });
      navigate('/');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      addToast({
        type: 'error',
        title: 'Registration Failed',
        message: error.response?.data?.message || 'An error occurred during registration.',
      });
    },
  });

  const logout = async () => {
    const refreshToken = getStoredRefreshToken();
    try {
      await authApi.logout(refreshToken);
    } catch {
      // Ignore network failures on logout
    } finally {
      disconnectSocket();
      clearAuth();
      queryClient.clear();
      addToast({
        type: 'info',
        title: 'Signed Out',
        message: 'You have been successfully signed out.',
      });
      navigate('/login');
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    sessionTerminatedReason,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout,
  };
}
