import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PulseLine } from '@/components/ui/pulse-line';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { HeroBoard } from '@/components/home/hero-board';
import { HowItWorks } from '@/components/home/how-it-works';
import { CompatibilityGrid } from '@/components/home/compatibility-grid';
import { StatsBand } from '@/components/home/stats-band';

export const metadata: Metadata = {
  title: 'Blood Donation & Emergency Response',
  description:
    'LifeLine matches verified blood requests to compatible, eligible donors by blood group, location, and urgency.',
  openGraph: {
    title: 'LifeLine — Blood Donation & Emergency Response',
    description:
      'Matching blood requests to compatible, eligible donors — fast.',
  },
};

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className='mx-auto max-w-6xl px-6 pt-16 pb-20 grid gap-12 lg:grid-cols-2 lg:items-center'>
          <div>
            <h1 className='font-display text-4xl sm:text-5xl font-semibold leading-[1.1] text-ink'>
              Find compatible donors for urgent blood requests — fast.
            </h1>
            <p className='mt-5 text-base text-ink-soft max-w-[48ch]'>
              Every request is verified, matched against blood type, location,
              and donor eligibility, then routed to compatible donors
              immediately.
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <Button variant='emergency' size='lg' asChild>
                <Link href='/register?role=requester'>Request blood</Link>
              </Button>
              <Button variant='outline' size='lg' asChild>
                <Link href='/register?role=donor'>Become a donor</Link>
              </Button>
            </div>
          </div>
          <HeroBoard />
        </section>

        <div className='mx-auto max-w-6xl px-6'>
          <PulseLine className='w-24' />
        </div>

        <HowItWorks />

        <CompatibilityGrid />
        <StatsBand />

        <section className='bg-ink text-paper'>
          <div className='mx-auto max-w-6xl px-6 py-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
            <div>
              <h2 className='font-display text-2xl sm:text-3xl font-semibold'>
                One donation can close a request in hours, not days.
              </h2>
              <p className='mt-2 text-paper/60 max-w-[50ch]'>
                Register once. We&apos;ll only notify you when you&apos;re
                actually eligible and nearby.
              </p>
            </div>
            <Button variant='emergency' size='lg' asChild>
              <Link href='/register?role=donor'>Register as a donor</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
