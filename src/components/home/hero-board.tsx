import { UrgencyPill } from '@/components/ui/status-pill';

const activeRequests = [
  {
    bloodGroup: 'O_NEG',
    urgency: 'CRITICAL' as const,
    city: 'Dhaka',
    unitsNeeded: 3,
    postedMinsAgo: 4,
  },
  {
    bloodGroup: 'A_POS',
    urgency: 'URGENT' as const,
    city: 'Chattogram',
    unitsNeeded: 2,
    postedMinsAgo: 22,
  },
  {
    bloodGroup: 'B_POS',
    urgency: 'NORMAL' as const,
    city: 'Sylhet',
    unitsNeeded: 1,
    postedMinsAgo: 51,
  },
  {
    bloodGroup: 'AB_NEG',
    urgency: 'URGENT' as const,
    city: 'Dhaka',
    unitsNeeded: 4,
    postedMinsAgo: 9,
  },
];

function formatGroup(group: string) {
  return group.replace('_POS', '+').replace('_NEG', '−');
}

export function HeroBoard() {
  return (
    <div className='border border-line-soft bg-paper-raised'>
      <div className='flex items-center justify-between border-b border-line-soft px-4 py-3'>
        <span className='text-xs font-mono text-line'>Active requests</span>
        <span className='flex items-center gap-1.5 text-xs font-mono text-pulse-teal'>
          <span
            className='size-1.5 rounded-full bg-pulse-teal animate-pulse'
            aria-hidden
          />
          live
        </span>
      </div>
      <ul className='divide-y divide-line-soft'>
        {activeRequests.map((req, i) => (
          <li key={i} className='flex items-center gap-4 px-4 py-3.5'>
            <span className='font-display text-xl font-semibold w-12 shrink-0'>
              {formatGroup(req.bloodGroup)}
            </span>
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium'>
                {req.city} needs {req.unitsNeeded} unit
                {req.unitsNeeded > 1 ? 's' : ''}
              </p>
              <p className='text-xs text-line font-mono'>
                {req.postedMinsAgo} min ago
              </p>
            </div>
            <UrgencyPill level={req.urgency} />
          </li>
        ))}
      </ul>
    </div>
  );
}
