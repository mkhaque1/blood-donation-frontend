import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { LayoutDashboard, Users, FileClock, ShieldCheck } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/verify', label: 'Verification queue', icon: ShieldCheck },
  { href: '/admin/manage', label: 'Manage users', icon: Users },
  { href: '/admin/reports', label: 'Audit logs', icon: FileClock },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navItems={navItems} roleLabel='Admin'>
      {children}
    </DashboardShell>
  );
}
