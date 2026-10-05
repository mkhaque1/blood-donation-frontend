import type { LucideIcon } from 'lucide-react';

export function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'blood' | 'teal';
}) {
  return (
    <div className='border border-line-soft bg-paper-raised p-5'>
      <div className='flex items-center justify-between'>
        <span className='text-xs font-mono text-line'>{label}</span>
        <Icon
          size={16}
          className={
            accent === 'blood'
              ? 'text-blood'
              : accent === 'teal'
                ? 'text-pulse-teal'
                : 'text-line'
          }
        />
      </div>
      <p className='mt-3 font-display text-3xl font-semibold'>{value}</p>
    </div>
  );
}
