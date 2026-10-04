'use client';

import { Suspense, useState } from 'react';
import { toast } from 'sonner';
import { Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/ui/status-pill';
import { useBloodRequests } from '@/hooks/use-blood-requests';
import {
  useInitiatePriorityFee,
  usePaymentStatus,
} from '@/hooks/use-requester';
import { formatGroup } from '@/lib/blood-compatibility';
import { ApiError } from '@/lib/api-types';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';

function PaymentsContent() {
  const { data, isLoading } = useBloodRequests({ limit: 50 });
  const initiateFee = useInitiatePriorityFee();
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null);
  const { data: payment } = usePaymentStatus(activePaymentId);

  const eligibleRequests = data?.items.filter(
    (r) => !r.isPriority && r.status !== 'CANCELLED',
  );

  const handlePay = (requestId: string) => {
    initiateFee.mutate(requestId, {
      onSuccess: (res) => {
        setActivePaymentId(res.paymentId);
        toast.success(
          'Payment initiated — confirm with your card to mark this request priority.',
        );
      },
      onError: (err) => {
        const message =
          err instanceof ApiError ? err.message : "Couldn't start payment";
        toast.error(message);
      },
    });
  };

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 max-w-3xl'>
      <h1 className='font-display text-2xl font-semibold'>
        Priority fee payments
      </h1>
      <p className='mt-1 text-sm text-ink-soft max-w-[60ch]'>
        Mark an urgent request as priority for faster donor visibility. This is
        a real Stripe test-mode charge — confirmation happens via webhook, not a
        manual status flip.
      </p>

      {activePaymentId && payment && (
        <div className='mt-6 border border-line-soft px-5 py-4 flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium'>
              Payment {payment.id.slice(0, 8)}
            </p>
            <p className='text-xs text-line font-mono'>
              ${(payment.amountCents / 100).toFixed(2)}
            </p>
          </div>
          <StatusPill status={payment.status as never} />
        </div>
      )}

      <div className='mt-8'>
        {isLoading && <BoardSkeleton rows={3} />}

        {!isLoading && eligibleRequests?.length === 0 && (
          <div className='border border-line-soft px-6 py-16 text-center'>
            <Receipt className='mx-auto text-line' size={28} />
            <p className='mt-3 text-sm text-ink-soft'>
              No requests eligible for a priority fee right now.
            </p>
          </div>
        )}

        {eligibleRequests && eligibleRequests.length > 0 && (
          <ul className='border border-line-soft divide-y divide-line-soft'>
            {eligibleRequests.map((req) => (
              <li key={req.id} className='flex items-center gap-4 px-5 py-4'>
                <span className='font-display text-lg font-semibold w-14 shrink-0'>
                  {formatGroup(req.bloodGroup)}
                </span>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-medium'>{req.patientName}</p>
                  <p className='text-xs text-line font-mono'>
                    {req.hospitalName}
                  </p>
                </div>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handlePay(req.id)}
                  disabled={initiateFee.isPending}
                >
                  Mark priority
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <Suspense fallback={<BoardSkeleton rows={3} />}>
      <PaymentsContent />
    </Suspense>
  );
}
