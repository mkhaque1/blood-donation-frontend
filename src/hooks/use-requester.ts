import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type { BloodRequest } from './use-blood-requests';

export interface RequesterProfile {
  fullName: string;
  phone: string;
  organizationType: string;
  organizationName: string | null;
  city: string;
  area: string;
}

export interface CreateRequestPayload {
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'NORMAL' | 'URGENT' | 'CRITICAL';
  hospitalName: string;
  city: string;
  area: string;
  neededBy: string;
  notes?: string;
}

export interface Payment {
  id: string;
  purpose: string;
  amountCents: number;
  status: string;
  createdAt: string;
}

export function useCreateBloodRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateRequestPayload) =>
      apiClient.post<BloodRequest>('/blood-requests', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blood-requests'] });
    },
  });
}

export function useCancelRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/blood-requests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blood-requests'] });
    },
  });
}

export function useInitiatePriorityFee() {
  return useMutation({
    mutationFn: (bloodRequestId: string) =>
      apiClient.post<{ clientSecret: string; paymentId: string }>(
        '/payments/initiate/priority-fee',
        { bloodRequestId },
      ),
  });
}

export function usePaymentStatus(paymentId: string | null) {
  return useQuery({
    queryKey: ['payment', paymentId],
    queryFn: () => apiClient.get<Payment>(`/payments/${paymentId}`),
    enabled: !!paymentId,
    refetchInterval: (query) =>
      query.state.data?.status === 'PENDING' ? 3000 : false,
  });
}
