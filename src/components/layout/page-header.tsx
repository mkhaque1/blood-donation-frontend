import { PulseLine } from '@/components/ui/pulse-line';

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className='mx-auto max-w-6xl px-6 pt-16 pb-12'>
      <span className='font-mono text-xs text-line'>{eyebrow}</span>
      <h1 className='mt-3 font-display text-4xl font-semibold max-w-[24ch]'>
        {title}
      </h1>
      {description && (
        <p className='mt-4 text-ink-soft max-w-[55ch]'>{description}</p>
      )}
      <PulseLine className='w-20 mt-8 opacity-40' />
    </div>
  );
}
