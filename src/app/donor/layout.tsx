import { DashboardShell } from '@/components/dashboard/dashboard-shell';

export default function DonorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell role='donor' roleLabel='Donor'>
      {children}
    </DashboardShell>
  );
}
