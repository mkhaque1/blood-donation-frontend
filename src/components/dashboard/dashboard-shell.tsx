'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutGrid, History, UserCircle, Receipt, type LucideIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: Record<string, NavItem[]> = {
  donor: [
    { href: '/donor', label: 'My tasks', icon: LayoutGrid },
    { href: '/donor/donations', label: 'Donation history', icon: History },
    { href: '/donor/profile', label: 'Profile', icon: UserCircle },
  ],
  requester: [
    { href: '/dashboard', label: 'My requests', icon: LayoutGrid },
    { href: '/dashboard/payment', label: 'Payments', icon: Receipt },
    { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
  ],
};

export function DashboardShell({
  children,
  role,
  roleLabel,
}: {
  children: React.ReactNode;
  role: string;
  roleLabel: string;
}) {
  const navItems = NAV_ITEMS[role] ?? [];
  const pathname = usePathname();
  const clearSession = useAuthStore((s) => s.clearSession);
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  return (
    <div className='min-h-screen flex'>
      <aside className='hidden md:flex md:w-60 shrink-0 flex-col border-r border-line-soft bg-paper-raised'>
        <div className='flex items-center gap-2 px-5 h-16 border-b border-line-soft'>
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
        </div>

        <nav className='flex-1 px-3 py-4 space-y-1'>
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors',
                  active
                    ? 'bg-ink text-paper'
                    : 'text-ink-soft hover:bg-paper hover:text-ink',
                )}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='px-3 py-4 border-t border-line-soft'>
          <span className='block px-3 text-xs font-mono text-line mb-2'>
            {roleLabel}
          </span>
          <button
            onClick={handleLogout}
            className='flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-soft hover:bg-paper hover:text-blood transition-colors'
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      <div className='flex-1 flex flex-col min-w-0'>
        <header className='md:hidden flex items-center justify-between h-14 px-4 border-b border-line-soft bg-paper-raised'>
          <span className='font-display text-base font-semibold'>LifeLine</span>
          <button onClick={handleLogout} aria-label='Log out'>
            <LogOut size={18} />
          </button>
        </header>
        <main className='flex-1 overflow-x-hidden'>{children}</main>
      </div>
    </div>
  );
}
