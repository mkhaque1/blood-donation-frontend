import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { LayoutGrid, Receipt, UserCircle } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'My requests', icon: LayoutGrid },
  { href: '/dashboard/payments', label: 'Payments', icon: Receipt },
  { href: '/dashboard/profile', label: 'Profile', icon: UserCircle },
];

export default function RequesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navItems={navItems} roleLabel='Requester'>
      {children}
    </DashboardShell>
  );
}
