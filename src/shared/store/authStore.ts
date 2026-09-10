import { create } from 'zustand';
import { User } from '../types/api';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sessionTerminatedReason: string | null;
  setAuth: (user: User, accessToken: string, refreshToken?: string) => void;
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  clearAuth: (reason?: string | null) => void;
  setLoading: (loading: boolean) => void;
}

const REFRESH_TOKEN_KEY = 'universal_market_refresh_token';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  sessionTerminatedReason: null,

  setAuth: (user, accessToken, refreshToken) => {
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    set({
      user,
      accessToken,
      isAuthenticated: true,
      isLoading: false,
      sessionTerminatedReason: null,
    });
  },

  setAccessToken: (accessToken) => {
    set({ accessToken, isAuthenticated: true });
  },

  setUser: (user) => {
    set({ user });
  },

  clearAuth: (reason = null) => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      sessionTerminatedReason: reason,
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },
}));

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearStoredRefreshToken(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}
