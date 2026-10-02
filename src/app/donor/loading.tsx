import { BoardSkeleton } from '@/components/patterns/board-skeleton';

export default function DonorLoading() {
  return (
    <div className='px-6 py-8 md:px-10 md:py-10 max-w-4xl'>
      <div className='h-7 w-32 bg-line-soft animate-pulse mb-2' />
      <div className='h-4 w-64 bg-line-soft animate-pulse mb-6' />
      <BoardSkeleton rows={4} />
    </div>
  );
}
