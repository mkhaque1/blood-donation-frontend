'use client';

import { useUrlFilters } from '@/hooks/use-url-filters';
import { cn } from '@/lib/utils';

const roles = [
  { value: undefined, label: 'All' },
  { value: 'DONOR', label: 'Donors' },
  { value: 'REQUESTER', label: 'Requesters' },
  { value: 'ADMIN', label: 'Admins' },
];

export function RoleFilter() {
  const { setFilter, getFilter } = useUrlFilters();
  const active = getFilter('role');

  return (
    <div className='flex flex-wrap gap-2'>
      {roles.map((r) => (
        <button
          key={r.label}
          onClick={() => setFilter('role', r.value)}
          className={cn(
            'border px-3 py-1.5 text-xs font-mono transition-colors',
            active === r.value || (!active && !r.value)
              ? 'border-ink bg-ink text-paper'
              : 'border-line-soft text-ink-soft hover:border-ink',
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
