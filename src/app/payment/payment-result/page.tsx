'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaymentResult } from '@/components/payment/payment-result';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const outcome = useMemo(
    () => (searchParams.get('status') === 'cancel' ? 'cancel' : 'success'),
    [searchParams],
  );

  return <PaymentResult outcome={outcome} />;
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultContent />
    </Suspense>
  );
}
