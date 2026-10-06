import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PaymentResult } from '@/components/payment/payment-result';

export const metadata: Metadata = { title: 'Payment cancelled' };

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResult outcome='cancel' />
    </Suspense>
  );
}
