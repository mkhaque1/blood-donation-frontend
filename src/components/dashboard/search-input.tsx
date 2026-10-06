'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUrlFilters } from '@/hooks/use-url-filters';

export function SearchInput({
  paramKey = 'q',
  placeholder = 'Search…',
}: {
  paramKey?: string;
  placeholder?: string;
}) {
  const { setFilter, getFilter } = useUrlFilters();
  const [value, setValue] = useState(getFilter(paramKey) ?? '');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter(paramKey, value || undefined);
    }, 400);
    return () => clearTimeout(timeout);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='relative'>
      <Search
        size={14}
        className='absolute left-3 top-1/2 -translate-y-1/2 text-line'
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className='w-full border border-line-soft bg-paper-raised pl-9 pr-3 py-2 text-sm'
      />
    </div>
  );
}
