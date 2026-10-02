'use client';

import { useUrlFilters } from '@/hooks/use-url-filters';
import { cn } from '@/lib/utils';

const statuses = [
  { value: undefined, label: 'All' },
  { value: 'PENDING_VERIFICATION', label: 'Pending' },
  { value: 'MATCHING', label: 'Matching' },
  { value: 'DONOR_ASSIGNED', label: 'Assigned' },
  { value: 'COMPLETED', label: 'Completed' },
];

export function StatusFilter() {
  const { setFilter, getFilter } = useUrlFilters();
  const active = getFilter('status');

  return (
    <div className='flex flex-wrap gap-2'>
      {statuses.map((s) => (
        <button
          key={s.label}
          onClick={() => setFilter('status', s.value)}
          className={cn(
            'border px-3 py-1.5 text-xs font-mono transition-colors',
            active === s.value || (!active && !s.value)
              ? 'border-ink bg-ink text-paper'
              : 'border-line-soft text-ink-soft hover:border-ink',
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
