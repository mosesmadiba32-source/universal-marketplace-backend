import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../shared/lib/queryClient';
import { ToastNotificationContainer } from '../shared/components/ToastNotificationContainer';
import { useAuthStore, getStoredRefreshToken } from '../shared/store/authStore';
import { apiClient } from '../shared/lib/apiClient';

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const { setAccessToken, setUser, setLoading, clearAuth } = useAuthStore();

  useEffect(() => {
    const refreshToken = getStoredRefreshToken();

    if (!refreshToken) {
      setLoading(false);
      return;
    }

    setLoading(true);

    apiClient
      .post<{ success: boolean; data: { accessToken: string } }>(
        '/api/auth/refresh',
        { refreshToken }
      )
      .then(async (res) => {
        const { accessToken } = res.data.data;

        setAccessToken(accessToken);

        const meResponse = await apiClient.get<{ success: boolean; data: { user: any } }>('/api/auth/me');
        const user = meResponse.data.data.user;

        setUser(user);
      })
      .catch(() => {
        clearAuth();
      })
      .finally(() => {
        setLoading(false);
      });

    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydrator>
        {children}
        <ToastNotificationContainer />
      </AuthHydrator>
    </QueryClientProvider>
  );
}
