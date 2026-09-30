'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'How it works' },
  { href: '/blood-types', label: 'Blood types' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 border-b border-line-soft bg-paper/95 backdrop-blur'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <svg width='20' height='20' viewBox='0 0 20 20' aria-hidden>
            <path
              d='M2,10 L7,10 L8.5,4 L11,16 L12.5,10 L18,10'
              fill='none'
              stroke='var(--color-blood)'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span className='font-display text-lg font-semibold tracking-tight'>
            LifeLine
          </span>
        </Link>

        <nav className='hidden md:flex items-center gap-8'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm text-ink-soft hover:text-ink transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center gap-3'>
          <Button variant='ghost' size='sm' asChild>
            <Link href='/login'>Log in</Link>
          </Button>
          <Button variant='emergency' size='sm' asChild>
            <Link href='/register?role=requester'>Request blood</Link>
          </Button>
        </div>

        <button
          className='md:hidden'
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className='md:hidden border-t border-line-soft bg-paper px-6 py-4 flex flex-col gap-4'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm text-ink-soft'
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className='flex gap-3 pt-2'>
            <Button variant='outline' size='sm' asChild className='flex-1'>
              <Link href='/login'>Log in</Link>
            </Button>
            <Button variant='emergency' size='sm' asChild className='flex-1'>
              <Link href='/register?role=requester'>Request blood</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
