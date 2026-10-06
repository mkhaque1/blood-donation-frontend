import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PaymentResult } from '@/components/payment/payment-result';

export const metadata: Metadata = { title: 'Payment successful' };

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResult outcome='success' />
    </Suspense>
  );
}
