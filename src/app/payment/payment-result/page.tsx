'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PulseLine } from '@/components/ui/pulse-line';
import { usePaymentStatus } from '@/hooks/use-requester';

export function PaymentResult({ outcome }: { outcome: 'success' | 'cancel' }) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const { data: payment } = usePaymentStatus(paymentId);

  const isSuccess = outcome === 'success';

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-paper'>
      {isSuccess ? (
        <CheckCircle2 size={40} className='text-pulse-teal' />
      ) : (
        <XCircle size={40} className='text-blood' />
      )}

      <div className='space-y-2'>
        <h1 className='font-display text-2xl font-semibold'>
          {isSuccess ? 'Payment confirmed' : 'Payment cancelled'}
        </h1>
        <p className='text-ink-soft max-w-md'>
          {isSuccess
            ? 'Your priority fee is being processed. This page updates automatically once Stripe confirms it.'
            : 'No charge was made. You can try again anytime from your payments page.'}
        </p>
      </div>

      {payment && (
        <div className='border border-line-soft px-5 py-3 text-sm font-mono'>
          Status:{' '}
          <span
            className={
              payment.status === 'SUCCEEDED'
                ? 'text-pulse-teal'
                : 'text-alert-amber'
            }
          >
            {payment.status}
          </span>
        </div>
      )}

      <PulseLine className='w-24 opacity-40' />

      <div className='flex gap-3'>
        <Button asChild>
          <Link href='/dashboard/payments'>Back to payments</Link>
        </Button>
        <Button variant='outline' asChild>
          <Link href='/dashboard'>Go to dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
