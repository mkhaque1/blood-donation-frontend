'use client';

import { toast } from 'sonner';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UrgencyPill } from '@/components/ui/status-pill';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import { useBloodRequests } from '@/hooks/use-blood-requests';
import { useDonorProfile, useAcceptRequest } from '@/hooks/use-donor';
import { isCompatibleDonor, formatGroup } from '@/lib/blood-compatibility';
import { ApiError } from '@/lib/api-types';

export default function DonorTasksPage() {
  const { data: profile } = useDonorProfile();
  const { data: requests, isLoading } = useBloodRequests({
    status: 'MATCHING',
    limit: 50,
  });
  const acceptRequest = useAcceptRequest();

  const compatibleRequests = profile
    ? requests?.items?.filter((r) =>
        isCompatibleDonor(profile.bloodGroup, r.bloodGroup),
      )
    : [];

  const handleAccept = (requestId: string, patientName: string) => {
    acceptRequest.mutate(requestId, {
      onSuccess: () =>
        toast.success(
          `You've pledged to donate for ${patientName}. Thank you.`,
        ),
      onError: (err) => {
        const message =
          err instanceof ApiError
            ? err.message
            : "Couldn't accept this request";
        toast.error(message);
      },
    });
  };

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 max-w-4xl'>
      <h1 className='font-display text-2xl font-semibold'>My tasks</h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Requests compatible with your blood group, open for a donor to accept.
      </p>

      {!profile?.isAvailable && (
        <div className='mt-6 border border-alert-amber/30 bg-alert-amber-soft px-4 py-3 text-sm'>
          You&apos;re marked unavailable, so new matches won&apos;t be routed to
          you. Update this on your{' '}
          <a href='/donor/profile' className='underline'>
            profile page
          </a>
          .
        </div>
      )}

      <div className='mt-6'>
        {isLoading && <BoardSkeleton rows={4} />}

        {!isLoading && compatibleRequests?.length === 0 && (
          <div className='border border-line-soft px-6 py-16 text-center'>
            <Heart className='mx-auto text-line' size={28} />
            <p className='mt-3 text-sm text-ink-soft'>
              No compatible requests right now — check back soon.
            </p>
          </div>
        )}

        {!isLoading && compatibleRequests && compatibleRequests.length > 0 && (
          <ul className='border border-line-soft divide-y divide-line-soft'>
            {compatibleRequests.map((req) => (
              <li
                key={req.id}
                className='flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4'
              >
                <span className='font-display text-xl font-semibold w-14 shrink-0'>
                  {formatGroup(req.bloodGroup)}
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium'>
                    {req.patientName} — {req.hospitalName}
                  </p>
                  <p className='text-xs text-line font-mono'>
                    {req.city} · {req.unitsNeeded} unit(s) needed
                  </p>
                </div>
                <UrgencyPill level={req.urgency} />
                <Button
                  variant='emergency'
                  size='sm'
                  disabled={acceptRequest.isPending}
                  onClick={() => handleAccept(req.id, req.patientName)}
                >
                  Accept
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
