'use client';

import { Button } from '@/components/ui/button';
import { PulseLine } from '@/components/ui/pulse-line';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center'>
      <PulseLine className='w-32' />
      <div className='space-y-2'>
        <h1 className='font-display text-2xl font-semibold'>
          Something interrupted the connection
        </h1>
        <p className='text-line max-w-md'>
          The request didn&apos;t complete. This has been logged — try again, or
          head back to safety.
        </p>
      </div>
      <div className='flex gap-3'>
        <Button onClick={reset}>Try again</Button>
        <Button variant='outline' asChild>
          <Link href='/'>Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
