'use client';

import {
  Users,
  Droplet,
  CheckCircle2,
  Wallet,
  Heart,
  Building2,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { StatCard } from '@/components/dashboard/stat-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats } from '@/hooks/use-admin';

export default function AdminOverviewPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading || !stats) {
    return (
      <div className='px-6 py-8 md:px-10 md:py-10'>
        <Skeleton className='h-7 w-40 mb-6' />
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-28' />
          ))}
        </div>
      </div>
    );
  }

  const roleData = [
    { name: 'Donors', value: stats.totalDonors },
    { name: 'Requesters', value: stats.totalRequesters },
  ];
  const requestData = [
    { name: 'Pending', value: stats.pendingRequests },
    { name: 'Completed', value: stats.completedRequests },
  ];
  const COLORS = ['var(--color-blood)', 'var(--color-pulse-teal)'];

  return (
    <div className='px-6 py-8 md:px-10 md:py-10'>
      <h1 className='font-display text-2xl font-semibold'>Overview</h1>
      <p className='mt-1 text-sm text-ink-soft'>
        Platform-wide activity at a glance.
      </p>

      <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          label='Total donors'
          value={stats.totalDonors}
          icon={Heart}
          accent='blood'
        />
        <StatCard
          label='Total requesters'
          value={stats.totalRequesters}
          icon={Building2}
        />
        <StatCard
          label='Pending requests'
          value={stats.pendingRequests}
          icon={Droplet}
          accent='blood'
        />
        <StatCard
          label='Completed requests'
          value={stats.completedRequests}
          icon={CheckCircle2}
          accent='teal'
        />
        <StatCard
          label='Total donations'
          value={stats.totalDonations}
          icon={Users}
          accent='teal'
        />
        <StatCard
          label='Priority fee revenue'
          value={`$${(stats.totalRevenueCents / 100).toFixed(2)}`}
          icon={Wallet}
        />
      </div>

      <div className='mt-8 grid gap-6 lg:grid-cols-2'>
        <div className='border border-line-soft p-5'>
          <h2 className='text-sm font-medium mb-4'>User base by role</h2>
          <ResponsiveContainer width='100%' height={220}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey='value'
                nameKey='name'
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
              >
                {roleData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  border: '1px solid var(--color-line-soft)',
                  borderRadius: 0,
                  fontFamily: 'var(--font-data)',
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='border border-line-soft p-5'>
          <h2 className='text-sm font-medium mb-4'>
            Requests: pending vs. completed
          </h2>
          <ResponsiveContainer width='100%' height={220}>
            <BarChart data={requestData}>
              <CartesianGrid
                strokeDasharray='2 2'
                stroke='var(--color-line-soft)'
              />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 12, fontFamily: 'var(--font-data)' }}
                axisLine={{ stroke: 'var(--color-line-soft)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fontFamily: 'var(--font-data)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  border: '1px solid var(--color-line-soft)',
                  borderRadius: 0,
                  fontFamily: 'var(--font-data)',
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey='value'
                fill='var(--color-blood)'
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
