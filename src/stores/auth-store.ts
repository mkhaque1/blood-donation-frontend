import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'DONOR' | 'REQUESTER' | 'ADMIN';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  role: Role | null;
  setSession: (session: {
    accessToken: string;
    refreshToken: string;
    role: Role;
  }) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      role: null,
      setSession: ({ accessToken, refreshToken, role }) =>
        set({ accessToken, refreshToken, role }),
      clearSession: () =>
        set({ accessToken: null, refreshToken: null, role: null }),
    }),
    { name: 'lifeline-auth' },
  ),
);
