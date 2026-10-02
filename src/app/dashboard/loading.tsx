import { BoardSkeleton } from '@/components/patterns/board-skeleton';

export default function DashboardLoading() {
  return (
    <div className='px-6 py-8 md:px-10 md:py-10'>
      <div className='h-7 w-40 bg-line-soft animate-pulse mb-2' />
      <div className='h-4 w-64 bg-line-soft animate-pulse mb-6' />
      <BoardSkeleton rows={5} />
    </div>
  );
}
