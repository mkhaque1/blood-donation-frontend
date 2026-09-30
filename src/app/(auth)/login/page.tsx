import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { DemoLogin } from '@/components/auth/demo-login';
import { PulseLine } from '@/components/ui/pulse-line';

export const metadata: Metadata = {
  title: 'Log in',
};

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center px-6 py-12 bg-paper'>
      <div className='w-full max-w-sm'>
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

        <h1 className='font-display text-2xl font-semibold'>Welcome back</h1>
        <p className='mt-1 text-sm text-ink-soft'>Log in to your account</p>

        <div className='mt-8'>
          <LoginForm />
        </div>

        <div className='my-8'>
          <PulseLine className='w-full opacity-40' />
        </div>

        <div>
          <p className='text-xs font-mono text-line mb-3'>
            Quick demo login — evaluator access
          </p>
          <DemoLogin />
        </div>

        <p className='mt-8 text-sm text-ink-soft text-center'>
          New here?{' '}
          <Link href='/register' className='text-blood hover:underline'>
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
