'use client';

import { useState } from 'react';
import { ShieldCheck, Heart, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { ApiError } from '@/lib/api-types';

const demoAccounts = [
  {
    role: 'ADMIN' as const,
    label: 'Admin',
    icon: ShieldCheck,
    email: 'admin@blooddonation.test',
    password: 'ChangeMe123!',
  },
  {
    role: 'REQUESTER' as const,
    label: 'Requester',
    icon: Building2,
    email: 'seed.requester@test.com',
    password: 'RequesterPass123',
  },
  {
    role: 'DONOR' as const,
    label: 'Donor',
    icon: Heart,
    email: 'seed.donor@test.com',
    password: 'DonorPass123',
  },
];

export function DemoLogin() {
  const login = useLogin();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const handleDemoLogin = (email: string, password: string, role: string) => {
    setLoadingRole(role);
    login.mutate(
      { email, password },
      {
        onError: (err) => {
          const message =
            err instanceof ApiError ? err.message : 'Demo login failed';
          toast.error(message);
        },
        onSettled: () => setLoadingRole(null),
      },
    );
  };

  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-2 gap-3'>
        {demoAccounts.slice(0, 2).map((account) => (
          <DemoButton
            key={account.role}
            account={account}
            loading={loadingRole === account.role}
            onClick={handleDemoLogin}
          />
        ))}
      </div>
      <DemoButton
        account={demoAccounts[2]}
        loading={loadingRole === demoAccounts[2].role}
        onClick={handleDemoLogin}
        full
      />
    </div>
  );
}

function DemoButton({
  account,
  loading,
  onClick,
  full,
}: {
  account: (typeof demoAccounts)[number];
  loading: boolean;
  onClick: (email: string, password: string, role: string) => void;
  full?: boolean;
}) {
  const Icon = account.icon;
  return (
    <button
      type='button'
      disabled={loading}
      onClick={() => onClick(account.email, account.password, account.role)}
      className={`border border-line-soft px-4 py-3.5 text-left hover:border-ink transition-colors disabled:opacity-50 ${full ? 'w-full' : ''}`}
    >
      <Icon size={18} className='text-blood' />
      <p className='mt-2 text-sm font-medium'>{account.label}</p>
      <p className='text-xs text-line font-mono'>
        {loading ? 'Logging in…' : 'Demo login'}
      </p>
    </button>
  );
}
