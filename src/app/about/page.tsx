import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { PageHeader } from '@/components/layout/page-header';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Why LifeLine exists and how it coordinates blood donation at the point of need.',
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow='about this platform'
          title="Blood shortages aren't a supply problem. They're a coordination problem."
          description="On any given day, there's usually a compatible, willing donor somewhere nearby. The failure is almost always in finding them in time."
        />

        <section className='mx-auto max-w-6xl px-6 pb-20 grid gap-12 md:grid-cols-2'>
          <div>
            <h2 className='font-display text-2xl font-semibold'>
              What LifeLine does
            </h2>
            <p className='mt-3 text-ink-soft'>
              LifeLine is a matching layer between verified blood requests and
              eligible donors. A request from a patient or hospital is checked
              by an admin, then automatically filtered against blood type
              compatibility, city, donor availability, and medical eligibility —
              down to a short, actionable list in seconds, not hours of phone
              calls.
            </p>
          </div>
          <div>
            <h2 className='font-display text-2xl font-semibold'>
              What it doesn&apos;t do
            </h2>
            <p className='mt-3 text-ink-soft'>
              LifeLine doesn&apos;t replace a hospital&apos;s blood bank,
              provide medical advice, or dispatch ambulances. It&apos;s a
              coordination tool — the donation itself still happens in person,
              through your local hospital or blood bank, following their
              clinical process.
            </p>
          </div>
        </section>

        <section className='bg-paper-raised border-y border-line-soft'>
          <div className='mx-auto max-w-6xl px-6 py-16 grid gap-10 sm:grid-cols-3'>
            <div>
              <span className='font-mono text-sm text-blood'>
                Verified first
              </span>
              <p className='mt-2 text-sm text-ink-soft'>
                Every request is reviewed by an admin before it reaches a single
                donor.
              </p>
            </div>
            <div>
              <span className='font-mono text-sm text-blood'>
                Eligibility enforced
              </span>
              <p className='mt-2 text-sm text-ink-soft'>
                Age, weight, and a 90-day rest period between donations are
                checked automatically.
              </p>
            </div>
            <div>
              <span className='font-mono text-sm text-blood'>
                No duplicate assignment
              </span>
              <p className='mt-2 text-sm text-ink-soft'>
                Once a donor is matched to a request, the system locks that
                assignment to prevent conflicts.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
