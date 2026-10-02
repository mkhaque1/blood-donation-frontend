'use client';

import { UrgencyPill } from '@/components/ui/status-pill';
import { useBloodRequests } from '@/hooks/use-blood-requests';
import { Skeleton } from '@/components/ui/skeleton';

function formatGroup(group: string) {
  return group.replace('_POS', '+').replace('_NEG', '−');
}

function minutesAgo(iso: string) {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export function HeroBoard() {
  const { data, isLoading, isError } = useBloodRequests({
    status: 'MATCHING',
    limit: 4,
  });

  return (
    <div className='border border-line-soft bg-paper-raised'>
      <div className='flex items-center justify-between border-b border-line-soft px-4 py-3'>
        <span className='text-xs font-mono text-line'>Active requests</span>
        <span className='flex items-center gap-1.5 text-xs font-mono text-pulse-teal'>
          <span
            className='size-1.5 rounded-full bg-pulse-teal animate-pulse'
            aria-hidden
          />
          live
        </span>
      </div>

      {isLoading && (
        <div className='p-4 space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-10 w-full' />
          ))}
        </div>
      )}

      {isError && (
        <p className='px-4 py-6 text-sm text-line'>
          Couldn&apos;t load live requests right now.
        </p>
      )}

      {data?.items && data.items.length === 0 && (
        <p className='px-4 py-6 text-sm text-line'>
          No active requests right now — that&apos;s a good thing.
        </p>
      )}

      {data?.items && data.items.length > 0 && (
        <ul className='divide-y divide-line-soft'>
          {data.items.map((req) => (
            <li key={req.id} className='flex items-center gap-4 px-4 py-3.5'>
              <span className='font-display text-xl font-semibold w-12 shrink-0'>
                {formatGroup(req.bloodGroup)}
              </span>
              <div className='min-w-0 flex-1'>
                <p className='text-sm font-medium truncate'>
                  {req.city} needs {req.unitsNeeded} unit
                  {req.unitsNeeded > 1 ? 's' : ''}
                </p>
                <p className='text-xs text-line font-mono'>
                  {minutesAgo(req.createdAt)}
                </p>
              </div>
              <UrgencyPill level={req.urgency} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
