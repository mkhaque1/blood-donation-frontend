'use client';

import { History } from 'lucide-react';
import { StatusPill } from '@/components/ui/status-pill';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import { useDonationHistory } from '@/hooks/use-donor';
import { formatGroup } from '@/lib/blood-compatibility';

export default function DonationHistoryPage() {
  const { data, isLoading, isError } = useDonationHistory();

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 max-w-4xl'>
      <h1 className='font-display text-2xl font-semibold'>Donation history</h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Every request you&apos;ve pledged to, past and present.
      </p>

      <div className='mt-6'>
        {isLoading && <BoardSkeleton rows={3} />}

        {isError && (
          <p className='border border-line-soft px-6 py-10 text-center text-sm text-line'>
            Couldn&apos;t load your history right now.
          </p>
        )}

        {data && data.length === 0 && (
          <div className='border border-line-soft px-6 py-16 text-center'>
            <History className='mx-auto text-line' size={28} />
            <p className='mt-3 text-sm text-ink-soft'>
              No donations yet — accepted requests will show up here.
            </p>
          </div>
        )}

        {data && data.length > 0 && (
          <ul className='border border-line-soft divide-y divide-line-soft'>
            {data.map((donation) => (
              <li
                key={donation.id}
                className='flex items-center gap-4 px-5 py-4'
              >
                <span className='font-display text-lg font-semibold w-14 shrink-0'>
                  {formatGroup(donation.bloodRequest.bloodGroup)}
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium'>
                    {donation.bloodRequest.patientName} —{' '}
                    {donation.bloodRequest.hospitalName}
                  </p>
                  <p className='text-xs text-line font-mono'>
                    {donation.bloodRequest.city} ·{' '}
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusPill status={donation.status as never} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
