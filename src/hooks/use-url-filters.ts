'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Changing a filter resets pagination back to page 1 — a stale page
      // number from a previous filter would otherwise show a confusing
      // "no results" state.
      if (key !== 'page') params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const getFilter = useCallback(
    (key: string) => searchParams.get(key) ?? undefined,
    [searchParams],
  );

  return { setFilter, getFilter, searchParams };
}
