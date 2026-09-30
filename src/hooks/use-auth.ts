import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { useAuthStore, type Role } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: Role;
}

const roleHome: Record<Role, string> = {
  DONOR: '/donor',
  REQUESTER: '/dashboard',
  ADMIN: '/admin',
};

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiClient.post<LoginResponse>('/auth/login', credentials, {
        auth: false,
      }),
    onSuccess: (data) => {
      setSession(data);
      router.push(roleHome[data.role]);
    },
  });
}

interface RegisterPayload {
  email: string;
  password: string;
  role: 'DONOR' | 'REQUESTER';
  fullName: string;
  phone: string;
  city: string;
  area: string;
  bloodGroup?: string;
  dateOfBirth?: string;
  weightKg?: number;
  organizationType?: string;
  organizationName?: string;
}

export function useRegister() {
  const setSession = useAuthStore((s) => s.setSession);
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) =>
      apiClient.post<LoginResponse>('/auth/register', payload, { auth: false }),
    onSuccess: (data) => {
      setSession(data);
      router.push(roleHome[data.role]);
    },
  });
}
