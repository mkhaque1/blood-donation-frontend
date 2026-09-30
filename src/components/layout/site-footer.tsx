import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className='border-t border-line-soft bg-ink text-paper'>
      <div className='mx-auto max-w-6xl px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-4'>
        <div>
          <span className='font-display text-lg font-semibold'>LifeLine</span>
          <p className='mt-3 text-sm text-paper/60 max-w-[22ch]'>
            Matching blood requests to eligible donors, by group, location, and
            urgency.
          </p>
        </div>

        <div>
          <h3 className='text-sm font-medium mb-3'>Platform</h3>
          <ul className='space-y-2 text-sm text-paper/60'>
            <li>
              <Link
                href='/services'
                className='hover:text-paper transition-colors'
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                href='/blood-types'
                className='hover:text-paper transition-colors'
              >
                Blood compatibility
              </Link>
            </li>
            <li>
              <Link
                href='/register'
                className='hover:text-paper transition-colors'
              >
                Become a donor
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-sm font-medium mb-3'>Company</h3>
          <ul className='space-y-2 text-sm text-paper/60'>
            <li>
              <Link
                href='/about'
                className='hover:text-paper transition-colors'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='hover:text-paper transition-colors'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-sm font-medium mb-3'>Emergency?</h3>
          <p className='text-sm text-paper/60'>
            This platform coordinates donor matching. For immediate medical
            emergencies, contact your local emergency services directly.
          </p>
        </div>
      </div>
      <div className='border-t border-paper/10'>
        <div className='mx-auto max-w-6xl px-6 py-4 text-xs text-paper/40'>
          © {new Date().getFullYear()} LifeLine. Built for emergency blood
          coordination.
        </div>
      </div>
    </footer>
  );
}
