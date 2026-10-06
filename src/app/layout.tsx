import type { Metadata } from 'next';
import { Zilla_Slab, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';

const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-zilla-slab',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LifeLine — Blood Donation & Emergency Response',
    template: '%s — LifeLine',
  },
  description: 'Real-time blood request matching and donor dispatch.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${zillaSlab.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-paper focus:px-4 focus:py-2'
        >
          Skip to content
        </a>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
