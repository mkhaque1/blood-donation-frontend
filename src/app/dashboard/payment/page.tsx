'use client';

import { Suspense, useState } from 'react';
import { toast } from 'sonner';
import { Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PaymentStatusPill } from '@/components/ui/status-pill';
import { useBloodRequests } from '@/hooks/use-blood-requests';
import {
  useInitiatePriorityFee,
  usePaymentStatus,
} from '@/hooks/use-requester';
import { formatGroup } from '@/lib/blood-compatibility';
import { ApiError } from '@/lib/api-types';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import type { BloodRequest } from '@/hooks/use-blood-requests';

// Each row manages its own paymentId + polling independently.
function PaymentRow({ req }: { req: BloodRequest }) {
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const initiateFee = useInitiatePriorityFee();
  const { data: payment } = usePaymentStatus(paymentId);

  const handlePay = () => {
    initiateFee.mutate(req.id, {
      onSuccess: (res) => {
        setPaymentId(res.paymentId);
        toast.success('Payment initiated — waiting for Stripe confirmation.');
      },
      onError: (err) => {
        const message =
          err instanceof ApiError ? err.message : "Couldn't start payment";
        toast.error(message);
      },
    });
  };

  return (
    <li className='flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center'>
      <span className='font-display text-lg font-semibold w-14 shrink-0'>
        {formatGroup(req.bloodGroup)}
      </span>
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-medium'>{req.patientName}</p>
        <p className='text-xs text-line font-mono'>{req.hospitalName}</p>
      </div>

      {payment ? (
        <PaymentStatusPill status={payment.status as 'PENDING' | 'SUCCEEDED' | 'FAILED'} />
      ) : (
        <Button
          size='sm'
          variant='outline'
          onClick={handlePay}
          disabled={initiateFee.isPending}
        >
          Mark priority
        </Button>
      )}
    </li>
  );
}

function PaymentsContent() {
  const { data, isLoading } = useBloodRequests({ limit: 50 });

  const eligibleRequests = data?.items.filter(
    (r) => !r.isPriority && r.status !== 'CANCELLED',
  );

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
              <PaymentRow key={req.id} req={req} />
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
