'use client';

import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import type { RequesterProfile } from '@/hooks/use-requester';

export default function RequesterProfilePage() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () =>
      apiClient.get<{ email: string; requesterProfile: RequesterProfile }>(
        '/users/me',
      ),
  });

  if (isLoading) {
    return (
      <div className='px-6 py-8 md:px-10 md:py-10 max-w-2xl space-y-4'>
        <Skeleton className='h-7 w-40' />
        <Skeleton className='h-32 w-full' />
      </div>
    );
  }

  const profile = user?.requesterProfile;
  if (!profile) return null;

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 max-w-2xl'>
      <h1 className='font-display text-2xl font-semibold'>Profile</h1>
      <p className='mt-1 text-sm text-ink-soft'>Your account details.</p>

      <div className='mt-8 border border-line-soft'>
        <div className='flex items-center gap-3 border-b border-line-soft px-5 py-4'>
          <Building2 size={18} className='text-blood' />
          <span className='font-display text-lg font-semibold'>
            {profile.fullName}
          </span>
        </div>
        <dl className='divide-y divide-line-soft'>
          <Row label='Email' value={user!.email} />
          <Row label='Phone' value={profile.phone} />
          <Row
            label='Type'
            value={
              profile.organizationType === 'HOSPITAL'
                ? 'Hospital'
                : 'Individual'
            }
          />
          {profile.organizationName && (
            <Row label='Organization' value={profile.organizationName} />
          )}
          <Row label='Location' value={`${profile.area}, ${profile.city}`} />
        </dl>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex items-center justify-between px-5 py-3.5'>
      <dt className='text-sm text-ink-soft'>{label}</dt>
      <dd className='text-sm font-mono'>{value}</dd>
    </div>
  );
}
