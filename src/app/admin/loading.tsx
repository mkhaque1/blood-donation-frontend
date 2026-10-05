import { Skeleton } from '@/components/ui/skeleton';

export default function AdminLoading() {
  return (
    <div className='px-6 py-8 md:px-10 md:py-10'>
      <Skeleton className='h-7 w-40 mb-6' />
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className='h-28' />
        ))}
      </div>
    </div>
  );
}
