import type { Metadata } from 'next';
import { CreateRequestWizard } from '@/components/dashboard/create-request-wizard';

export const metadata: Metadata = { title: 'New request' };

export default function NewRequestPage() {
  return (
    <div className='px-6 py-8 md:px-10 md:py-10'>
      <h1 className='font-display text-2xl font-semibold'>
        Submit a blood request
      </h1>
      <p className='mt-1 text-sm text-ink-soft mb-8'>
        An admin will verify this before it&apos;s matched to donors.
      </p>
      <CreateRequestWizard />
    </div>
  );
}
