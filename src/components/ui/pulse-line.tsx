export function PulseLine({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden='true'>
      <svg
        viewBox='0 0 400 24'
        className='w-full h-6'
        preserveAspectRatio='none'
      >
        <path
          d='M0,12 L140,12 L155,2 L170,22 L185,12 L400,12'
          fill='none'
          stroke='var(--color-blood)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          pathLength='1'
          className='pulse-line-path'
        />
      </svg>
    </div>
  );
}
