import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { PageHeader } from '@/components/layout/page-header';
import { CompatibilityGrid } from '@/components/home/compatibility-grid';

export const metadata: Metadata = {
  title: 'Blood type compatibility',
  description:
    'A full reference for who can donate to whom, and why O negative and AB positive are special.',
};

const facts = [
  {
    group: 'O negative',
    role: 'Universal donor',
    detail:
      'Carries no A, B, or Rh antigens, so no immune system reacts against it — compatible with every blood group.',
  },
  {
    group: 'AB positive',
    role: 'Universal recipient',
    detail:
      'Already carries all major antigens, so it can safely receive from any donor blood group.',
  },
];

export default function BloodTypesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow='reference'
          title='Blood type compatibility, explained'
          description='LifeLine enforces these exact rules when matching donors to requests — nothing here is left to manual judgment.'
        />

        <section className='mx-auto max-w-6xl px-6 pb-16 grid gap-6 sm:grid-cols-2'>
          {facts.map((fact) => (
            <div key={fact.group} className='border border-line-soft p-6'>
              <span className='font-display text-xl font-semibold'>
                {fact.group}
              </span>
              <span className='ml-2 font-mono text-xs text-blood'>
                {fact.role}
              </span>
              <p className='mt-2 text-sm text-ink-soft'>{fact.detail}</p>
            </div>
          ))}
        </section>

        <CompatibilityGrid />
      </main>
      <SiteFooter />
    </>
  );
}
