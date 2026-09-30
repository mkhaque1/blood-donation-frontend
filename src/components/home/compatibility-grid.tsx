import { PulseLine } from '../ui/pulse-line';

const compatibility: { group: string; donors: string[] }[] = [
  { group: 'O−', donors: ['O−'] },
  { group: 'O+', donors: ['O−', 'O+'] },
  { group: 'A−', donors: ['O−', 'A−'] },
  { group: 'A+', donors: ['O−', 'O+', 'A−', 'A+'] },
  { group: 'B−', donors: ['O−', 'B−'] },
  { group: 'B+', donors: ['O−', 'O+', 'B−', 'B+'] },
  { group: 'AB−', donors: ['O−', 'A−', 'B−', 'AB−'] },
  { group: 'AB+', donors: ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'] },
];

export function CompatibilityGrid() {
  return (
    <section className='bg-paper-raised border-y border-line-soft'>
      <div className='mx-auto max-w-6xl px-6 py-20'>
        <PulseLine className='w-24 mb-10' />
        <h2 className='font-display text-3xl font-semibold max-w-[24ch]'>
          Who can donate to whom
        </h2>
        <p className='mt-3 text-ink-soft max-w-[55ch]'>
          Every match on LifeLine follows the same compatibility rules shown
          here — enforced automatically, not left to guesswork.
        </p>
        <div className='mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-line-soft border border-line-soft'>
          {compatibility.map((entry) => (
            <div key={entry.group} className='bg-paper-raised p-5'>
              <span className='font-display text-2xl font-semibold text-blood'>
                {entry.group}
              </span>
              <p className='mt-1 text-xs text-line'>can receive from</p>
              <div className='mt-3 flex flex-wrap gap-1.5'>
                {entry.donors.map((d) => (
                  <span
                    key={d}
                    className='font-mono text-xs border border-line-soft px-1.5 py-0.5'
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
