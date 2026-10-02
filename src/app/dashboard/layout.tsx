import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export default function RequesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role='requester' roleLabel='Requester'>
      {children}
    </DashboardShell>
  );
}
