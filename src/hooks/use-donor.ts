import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface DonorProfile {
  id: string;
  fullName: string;
  phone: string;
  bloodGroup: string;
  city: string;
  area: string;
  isAvailable: boolean;
  totalDonations: number;
  lastDonationDate: string | null;
  medicalNotes: string | null;
}

export interface Donation {
  id: string;
  status: string;
  completedAt: string | null;
  createdAt: string;
  bloodRequest: {
    patientName: string;
    hospitalName: string;
    bloodGroup: string;
    city: string;
  };
}

export function useDonorProfile() {
  return useQuery({
    queryKey: ['donor-profile'],
    queryFn: () => apiClient.get<DonorProfile>('/donors/me'),
  });
}

export function useToggleAvailability() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiClient.patch<DonorProfile>('/donors/me/availability'),
    onSuccess: (data) => {
      queryClient.setQueryData(['donor-profile'], data);
    },
  });
}

export function useDonationHistory() {
  return useQuery({
    queryKey: ['donation-history'],
    queryFn: () => apiClient.get<Donation[]>('/donors/me/donations'),
  });
}

export function useAcceptRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId: string) =>
      apiClient.post(`/blood-requests/${requestId}/accept`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blood-requests'] });
      queryClient.invalidateQueries({ queryKey: ['donation-history'] });
    },
  });
}
