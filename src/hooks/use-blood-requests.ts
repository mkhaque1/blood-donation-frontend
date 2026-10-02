import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { env } from '@/lib/env';
import { useAuthStore } from '@/stores/auth-store';
import { ApiError } from '@/lib/api-types';

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'NORMAL' | 'URGENT' | 'CRITICAL';
  hospitalName: string;
  city: string;
  area: string;
  status: string;
  neededBy: string;
  isPriority: boolean;
  createdAt: string;
}

interface ListParams {
  status?: string;
  bloodGroup?: string;
  city?: string;
  urgency?: string;
  page?: number;
  limit?: number;
}

export function useBloodRequests(params: ListParams = {}) {
  return useQuery({
    queryKey: ['blood-requests', params],
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
      const res = await fetch(`${env.apiUrl}/blood-requests?${query}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().accessToken}`,
        },
      });
      const json = await res.json();
      if (!json.success)
        throw new ApiError(res.status, json.message, json.errors);
      return { items: json.data as BloodRequest[], meta: json.meta };
    },
  });
}
