import { cn } from '@/lib/utils';

type UrgencyLevel = 'NORMAL' | 'URGENT' | 'CRITICAL';
type RequestStatus =
  | 'PENDING_VERIFICATION'
  | 'VERIFIED'
  | 'MATCHING'
  | 'DONOR_ASSIGNED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

const urgencyStyles: Record<UrgencyLevel, string> = {
  NORMAL: 'bg-pulse-teal-soft text-pulse-teal border-pulse-teal/20',
  URGENT: 'bg-alert-amber-soft text-alert-amber border-alert-amber/30',
  CRITICAL: 'bg-blood/10 text-blood border-blood/30',
};

const statusLabels: Record<RequestStatus, string> = {
  PENDING_VERIFICATION: 'Pending verification',
  VERIFIED: 'Verified',
  MATCHING: 'Finding donors',
  DONOR_ASSIGNED: 'Donor assigned',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  EXPIRED: 'Expired',
};

export function UrgencyPill({ level }: { level: UrgencyLevel }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-mono font-medium rounded-[var(--radius-pill)]',
        urgencyStyles[level],
      )}
    >
      {level === 'CRITICAL' && (
        <span
          className='size-1.5 rounded-full bg-blood animate-pulse'
          aria-hidden
        />
      )}
      {level}
    </span>
  );
}

export function StatusPill({ status }: { status: RequestStatus }) {
  return (
    <span className='inline-flex items-center border border-line-soft px-2.5 py-1 text-xs font-mono text-ink-soft rounded-[var(--radius-pill)]'>
      {statusLabels[status]}
    </span>
  );
}
