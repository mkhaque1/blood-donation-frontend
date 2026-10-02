'use client';

import { toast } from 'sonner';
import { useToggleAvailability } from '@/hooks/use-donor';
import { ApiError } from '@/lib/api-types';
import { cn } from '@/lib/utils';

export function AvailabilityToggle({ isAvailable }: { isAvailable: boolean }) {
  const toggle = useToggleAvailability();

  const handleToggle = () => {
    toggle.mutate(undefined, {
      onSuccess: (data) =>
        toast.success(
          data.isAvailable
            ? "You're now marked available"
            : "You're now marked unavailable",
        ),
      onError: (err) => {
        const message =
          err instanceof ApiError
            ? err.message
            : "Couldn't update availability";
        toast.error(message);
      },
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggle.isPending}
      className={cn(
        'flex items-center gap-3 border px-5 py-4 transition-colors w-full sm:w-auto',
        isAvailable
          ? 'border-pulse-teal bg-pulse-teal-soft'
          : 'border-line-soft',
      )}
    >
      <span
        className={cn(
          'size-2.5 rounded-full',
          isAvailable ? 'bg-pulse-teal animate-pulse' : 'bg-line',
        )}
      />
      <span className='text-sm font-medium'>
        {isAvailable ? 'Available to donate' : 'Not currently available'}
      </span>
    </button>
  );
}
