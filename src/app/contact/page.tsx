import type { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { PageHeader } from '@/components/layout/page-header';
import { ContactForm } from '@/components/contact/contact-form';
import { RadarPingVisual } from '@/components/ui/hero-visuals';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the LifeLine team.',
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow='get in touch'
          title='Questions about a request, a donation, or a partnership'
          description="This isn't an emergency line — for a medical emergency, contact your local emergency services directly."
          visual={<RadarPingVisual />}
        />

        <section className='mx-auto max-w-6xl px-6 pb-20 grid gap-12 md:grid-cols-[1fr_1.4fr]'>
          <div className='space-y-6'>
            <div className='flex gap-3'>
              <Mail size={18} className='text-blood mt-0.5 shrink-0' />
              <div>
                <p className='text-sm font-medium'>Email</p>
                <p className='text-sm text-ink-soft'>
                  support@lifeline.example
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <MapPin size={18} className='text-blood mt-0.5 shrink-0' />
              <div>
                <p className='text-sm font-medium'>Coverage</p>
                <p className='text-sm text-ink-soft'>
                  Dhaka, Chattogram, Sylhet, and expanding
                </p>
              </div>
            </div>
            <div className='flex gap-3'>
              <Clock size={18} className='text-blood mt-0.5 shrink-0' />
              <div>
                <p className='text-sm font-medium'>Response time</p>
                <p className='text-sm text-ink-soft'>
                  Within 1 business day for general inquiries
                </p>
              </div>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
