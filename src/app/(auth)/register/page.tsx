import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Create an account',
};

export default function RegisterPage() {
  return (
    <div className='min-h-screen flex items-center justify-center px-6 py-12 bg-paper'>
      <div className='w-full max-w-md'>
        <Link href='/' className='inline-flex items-center gap-2 mb-8'>
          <svg width='18' height='18' viewBox='0 0 20 20' aria-hidden>
            <path
              d='M2,10 L7,10 L8.5,4 L11,16 L12.5,10 L18,10'
              fill='none'
              stroke='var(--color-blood)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='font-display text-base font-semibold'>LifeLine</span>
        </Link>

        <h1 className='font-display text-2xl font-semibold'>
          Create your account
        </h1>
        <p className='mt-1 text-sm text-ink-soft'>
          Join as a donor or submit a blood request
        </p>

        <div className='mt-8'>
          <Suspense fallback={null}>
            <RegisterForm />
          </Suspense>
        </div>

        <p className='mt-8 text-sm text-ink-soft text-center'>
          Already have an account?{' '}
          <Link href='/login' className='text-blood hover:underline'>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
