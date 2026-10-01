import type { Metadata } from 'next';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { PageHeader } from '@/components/layout/page-header';
import { HowItWorks } from '@/components/home/how-it-works';

export const metadata: Metadata = {
  title: 'How it works',
  description:
    'The full request lifecycle from submission to completed donation.',
};

const lifecycle = [
  {
    status: 'Pending verification',
    detail:
      'A patient or hospital submits a request with patient details, blood group, units needed, and urgency.',
  },
  {
    status: 'Matching',
    detail:
      'An admin verifies the request is legitimate. The system then filters donors by compatibility, city, and availability.',
  },
  {
    status: 'Donor assigned',
    detail:
      'A compatible, eligible donor accepts. The system locks that assignment — no other donor can also claim this request.',
  },
  {
    status: 'Completed',
    detail:
      "Once the donation happens, the request closes and the donor's history and eligibility clock update automatically.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow='the full lifecycle'
          title='From submission to completed donation'
          description='Every request moves through the same four stages. Nothing skips verification, and nothing bypasses eligibility checks.'
        />

        <section className='mx-auto max-w-6xl px-6 pb-20'>
          <div className='border border-line-soft divide-y divide-line-soft'>
            {lifecycle.map((stage, i) => (
              <div key={stage.status} className='flex gap-6 px-6 py-6'>
                <span className='font-mono text-sm text-line w-6 shrink-0'>
                  {i + 1}
                </span>
                <div>
                  <h3 className='font-display text-lg font-semibold'>
                    {stage.status}
                  </h3>
                  <p className='mt-1 text-sm text-ink-soft max-w-[60ch]'>
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HowItWorks />
      </main>
      <SiteFooter />
    </>
  );
}
