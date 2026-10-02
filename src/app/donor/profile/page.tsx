'use client';

import { User } from 'lucide-react';
import { useDonorProfile } from '@/hooks/use-donor';
import { AvailabilityToggle } from '@/components/donor/availability-toggle';
import { formatGroup } from '@/lib/blood-compatibility';
import { Skeleton } from '@/components/ui/skeleton';

export default function DonorProfilePage() {
  const { data: profile, isLoading } = useDonorProfile();

  if (isLoading) {
    return (
      <div className='px-6 py-8 md:px-10 md:py-10 max-w-2xl space-y-4'>
        <Skeleton className='h-7 w-40' />
        <Skeleton className='h-32 w-full' />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 max-w-2xl'>
      <h1 className='font-display text-2xl font-semibold'>Profile</h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Your donor details and availability status.
      </p>

      <div className='mt-6'>
        <AvailabilityToggle isAvailable={profile.isAvailable} />
      </div>

      <div className='mt-8 border border-line-soft'>
        <div className='flex items-center gap-3 border-b border-line-soft px-5 py-4'>
          <User size={18} className='text-blood' />
          <span className='font-display text-lg font-semibold'>
            {profile.fullName}
          </span>
        </div>
        <dl className='divide-y divide-line-soft'>
          <Row label='Blood group' value={formatGroup(profile.bloodGroup)} />
          <Row label='Phone' value={profile.phone} />
          <Row label='Location' value={`${profile.area}, ${profile.city}`} />
          <Row label='Total donations' value={String(profile.totalDonations)} />
          <Row
            label='Last donation'
            value={
              profile.lastDonationDate
                ? new Date(profile.lastDonationDate).toLocaleDateString()
                : 'No donations yet'
            }
          />
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
