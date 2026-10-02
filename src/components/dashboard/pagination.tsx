'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUrlFilters } from '@/hooks/use-url-filters';

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const { setFilter } = useUrlFilters();
  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-between border-t border-line-soft px-5 py-3'>
      <span className='text-xs font-mono text-line'>
        Page {page} of {totalPages}
      </span>
      <div className='flex gap-2'>
        <button
          onClick={() => setFilter('page', String(page - 1))}
          disabled={page <= 1}
          className='border border-line-soft p-1.5 disabled:opacity-30'
          aria-label='Previous page'
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => setFilter('page', String(page + 1))}
          disabled={page >= totalPages}
          className='border border-line-soft p-1.5 disabled:opacity-30'
          aria-label='Next page'
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
