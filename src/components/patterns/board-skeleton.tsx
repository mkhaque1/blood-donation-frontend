import { Skeleton } from '@/components/ui/skeleton';

export function BoardSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className='border border-line-soft'>
      <div className='border-b border-line-soft bg-paper-raised px-4 py-3'>
        <Skeleton className='h-4 w-40' />
      </div>
      <div className='divide-y divide-line-soft'>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className='flex items-center gap-4 px-4 py-4'>
            <Skeleton className='h-4 w-4 shrink-0' />
            <Skeleton className='h-4 w-1/4' />
            <Skeleton className='h-4 w-1/6' />
            <Skeleton className='h-4 w-1/5 ml-auto' />
          </div>
        ))}
      </div>
    </div>
  );
}
