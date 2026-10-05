import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { env } from '@/lib/env';
import { useAuthStore } from '@/stores/auth-store';
import { ApiError } from '@/lib/api-types';

export interface DashboardStats {
  totalDonors: number;
  totalRequesters: number;
  pendingRequests: number;
  completedRequests: number;
  totalDonations: number;
  totalRevenueCents: number;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  targetType: string;
  targetId: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  actor: { email: string; role: string };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => apiClient.get<DashboardStats>('/admin/dashboard-stats'),
  });
}

interface ListUsersParams {
  page?: number;
  limit?: number;
  role?: string;
}

// Same pagination-metadata special case as useBloodRequests — see that file's comment.
export function useAdminUsers(params: ListUsersParams) {
  return useQuery({
    queryKey: ['admin-users', params],
    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [k, v]) => {
            if (v !== undefined) acc[k] = String(v);
            return acc;
          },
          {} as Record<string, string>,
        ),
      );
      const res = await fetch(`${env.apiUrl}/admin/users?${query}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });
      const json = await res.json();
      if (!json.success)
        throw new ApiError(res.status, json.message, json.errors);
      return { items: json.data as AdminUser[], meta: json.meta };
    },
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      apiClient.patch(`/admin/users/${id}/status`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
  });
}

export function useAdminAuditLogs(params: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['admin-audit-logs', params],
    queryFn: async () => {
      const query = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [k, v]) => {
            if (v !== undefined) acc[k] = String(v);
            return acc;
          },
          {} as Record<string, string>,
        ),
      );
      const res = await fetch(`${env.apiUrl}/admin/audit-logs?${query}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });
      const json = await res.json();
      if (!json.success)
        throw new ApiError(res.status, json.message, json.errors);
      return { items: json.data as AuditLogEntry[], meta: json.meta };
    },
  });
}

export function useVerifyRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.patch(`/blood-requests/${id}/verify`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blood-requests'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });
}
