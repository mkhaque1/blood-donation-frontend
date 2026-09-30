import { Button } from '@/components/ui/button';
import { PulseLine } from '@/components/ui/pulse-line';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center'>
      <PulseLine className='w-32' />
      <div className='space-y-2'>
        <h1 className='font-display text-2xl font-semibold'>
          This route doesn&apos;t exist
        </h1>
        <p className='text-line max-w-md'>
          Check the address, or head back to the dispatch board.
        </p>
      </div>
      <Button asChild>
        <Link href='/'>Go Home</Link>
      </Button>
    </div>
  );
}
