import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

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
    queryFn: () => {
      const query = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [k, v]) => {
            if (v !== undefined) acc[k] = String(v);
            return acc;
          },
          {} as Record<string, string>,
        ),
      );
      return apiClient.get<BloodRequest[]>(`/blood-requests?${query}`);
    },
  });
}
