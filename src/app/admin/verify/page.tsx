'use client';

import { toast } from 'sonner';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/data-table';
import { UrgencyPill } from '@/components/ui/status-pill';
import { BoardSkeleton } from '@/components/patterns/board-skeleton';
import {
  useBloodRequests,
  type BloodRequest,
} from '@/hooks/use-blood-requests';
import { useVerifyRequest } from '@/hooks/use-admin';
import { formatGroup } from '@/lib/blood-compatibility';
import { ApiError } from '@/lib/api-types';

export default function VerifyQueuePage() {
  const { data, isLoading } = useBloodRequests({
    status: 'PENDING_VERIFICATION',
    limit: 50,
  });
  const verify = useVerifyRequest();

  const handleVerify = (id: string, patientName: string) => {
    verify.mutate(id, {
      onSuccess: () =>
        toast.success(
          `${patientName}'s request verified and moved to matching.`,
        ),
      onError: (err) => {
        const message =
          err instanceof ApiError ? err.message : "Couldn't verify request";
        toast.error(message);
      },
    });
  };

  return (
    <div className='px-6 py-8 md:px-10 md:py-10 overflow-x-hidden'>
      <h1 className='font-display text-2xl font-semibold'>
        Verification queue
      </h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Requests waiting for review before they&apos;re opened up to donor
        matching.
      </p>

      <div className='mt-6'>
        {isLoading && <BoardSkeleton rows={4} />}

        {data && (
          <DataTable<BloodRequest>
            rows={data.items}
            emptyLabel='Nothing pending — the queue is clear.'
            columns={[
              { header: 'Patient', accessor: (r) => r.patientName },
              {
                header: 'Group',
                accessor: (r) => (
                  <span className='font-mono'>{formatGroup(r.bloodGroup)}</span>
                ),
              },
              { header: 'Hospital', accessor: (r) => r.hospitalName },
              { header: 'City', accessor: (r) => r.city },
              {
                header: 'Urgency',
                accessor: (r) => <UrgencyPill level={r.urgency} />,
              },
              {
                header: '',
                accessor: (r) => (
                  <Button
                    size='sm'
                    onClick={() => handleVerify(r.id, r.patientName)}
                    disabled={verify.isPending}
                  >
                    <ShieldCheck size={14} />
                    Verify
                  </Button>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
