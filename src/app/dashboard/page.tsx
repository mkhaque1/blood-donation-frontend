'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Plus, Inbox } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { StatusPill, UrgencyPill } from '@/components/ui/status-pill';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import { StatusFilter } from '@/components/dashboard/status-filter';
import { Pagination } from '@/components/dashboard/pagination';
import { useBloodRequests } from '@/hooks/use-blood-requests';
import { useCancelRequest } from '@/hooks/use-requester';
import { useUrlFilters } from '@/hooks/use-url-filters';
import { formatGroup } from '@/lib/blood-compatibility';
import { ApiError } from '@/lib/api-types';

function MyRequestsContent() {
  const { getFilter } = useUrlFilters();
  const status = getFilter('status');
  const page = Number(getFilter('page') ?? 1);

  const { data, isLoading, isError } = useBloodRequests({
    status,
    page,
    limit: 10,
  });
  const cancelRequest = useCancelRequest();

  const handleCancel = (id: string) => {
    cancelRequest.mutate(id, {
      onSuccess: () => toast.success('Request cancelled'),
      onError: (err) => {
        const message =
          err instanceof ApiError ? err.message : "Couldn't cancel request";
        toast.error(message);
      },
    });
  };

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 overflow-x-hidden'>
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h1 className='font-display text-2xl font-semibold'>My requests</h1>
          <p className='mt-1 text-sm text-ink-soft'>
            Every blood request you&apos;ve submitted.
          </p>
        </div>
        <Button variant='emergency' asChild>
          <Link href='/dashboard/requests/new'>
            <Plus size={16} />
            New request
          </Link>
        </Button>
      </div>

      <div className='mt-6'>
        <StatusFilter />
      </div>

      <div className='mt-4'>
        {isLoading && <BoardSkeleton rows={5} />}

        {isError && (
          <p className='border border-line-soft px-6 py-10 text-center text-sm text-line'>
            Couldn&apos;t load your requests right now.
          </p>
        )}

        {data?.items && data.items.length === 0 && (
          <div className='border border-line-soft px-6 py-16 text-center'>
            <Inbox className='mx-auto text-line' size={28} />
            <p className='mt-3 text-sm text-ink-soft'>
              No requests match this filter.
            </p>
          </div>
        )}

        {data?.items && data.items.length > 0 && (
          <div className='border border-line-soft'>
            <ul className='divide-y divide-line-soft'>
              {data.items.map((req) => (
                <li
                  key={req.id}
                  className='flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4'
                >
                  <span className='font-display text-lg font-semibold w-14 shrink-0'>
                    {formatGroup(req.bloodGroup)}
                  </span>
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-medium'>
                      {req.patientName} — {req.hospitalName}
                    </p>
                    <p className='text-xs text-line font-mono'>
                      {req.city} · {req.unitsNeeded} unit(s)
                    </p>
                  </div>
                  <UrgencyPill level={req.urgency} />
                  <StatusPill status={req.status as never} />
                  {!['COMPLETED', 'CANCELLED'].includes(req.status) && (
                    <button
                      onClick={() => handleCancel(req.id)}
                      className='text-xs text-blood hover:underline'
                    >
                      Cancel
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {data.meta && (
              <Pagination
                page={data.meta.page}
                totalPages={data.meta.totalPages}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyRequestsPage() {
  return (
    <Suspense fallback={<BoardSkeleton rows={5} />}>
      <MyRequestsContent />
    </Suspense>
  );
}
