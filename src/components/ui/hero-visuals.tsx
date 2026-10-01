export function BloodDropVisual() {
  return (
    <div className='relative flex items-center justify-center h-72'>
      <span className='absolute size-40 rounded-full border border-blood/30 sonar-ring' />
      <span className='absolute size-40 rounded-full border border-blood/30 sonar-ring [animation-delay:0.8s]' />
      <span className='absolute size-40 rounded-full border border-blood/30 sonar-ring [animation-delay:1.6s]' />

      <div style={{ perspective: '800px' }}>
        <svg
          width='140'
          height='180'
          viewBox='0 0 140 180'
          className='vital-spin'
          style={{ transformStyle: 'preserve-3d' }}
        >
          <path
            d='M70,8 C100,55 130,95 130,125 C130,153 103,172 70,172 C37,172 10,153 10,125 C10,95 40,55 70,8 Z'
            fill='var(--color-blood)'
          />
          <ellipse
            cx='52'
            cy='90'
            rx='14'
            ry='22'
            fill='var(--color-paper)'
            opacity='0.18'
          />
        </svg>
      </div>
    </div>
  );
}

export function MonitorVisual() {
  return (
    <div className='border border-line-soft bg-ink p-6 h-72 flex flex-col justify-between'>
      <div className='flex items-center justify-between'>
        <span className='font-mono text-xs text-paper/50'>vitals</span>
        <span className='flex items-center gap-1.5 text-xs font-mono text-pulse-teal'>
          <span
            className='size-1.5 rounded-full bg-pulse-teal animate-pulse'
            aria-hidden
          />
          monitoring
        </span>
      </div>

      <svg
        viewBox='0 0 300 80'
        className='w-full h-20'
        preserveAspectRatio='none'
      >
        <polyline
          points='0,40 40,40 55,10 70,70 85,40 120,40 135,25 150,55 165,40 300,40'
          fill='none'
          stroke='var(--color-pulse-teal)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='12 6'
          className='ecg-trace'
        />
      </svg>

      <div className='grid grid-cols-3 gap-4 font-mono text-xs text-paper/50'>
        <div>
          <span className='text-paper'>72</span> bpm
        </div>
        <div>
          <span className='text-paper'>98%</span> O2
        </div>
        <div>
          <span className='text-paper'>4</span> stages
        </div>
      </div>
    </div>
  );
}

export function RadarPingVisual() {
  const cities = [
    { label: 'Dhaka', x: 70, y: 60 },
    { label: 'Chattogram', x: 110, y: 100 },
    { label: 'Sylhet', x: 50, y: 30 },
  ];
  return (
    <div className='relative h-72 border border-line-soft bg-paper-raised flex items-center justify-center overflow-hidden'>
      <span className='absolute size-16 rounded-full border border-pulse-teal/40 sonar-ring' />
      <span className='absolute size-16 rounded-full border border-pulse-teal/40 sonar-ring [animation-delay:0.9s]' />
      <svg viewBox='0 0 140 140' className='w-40 h-40'>
        <circle cx='70' cy='70' r='3' fill='var(--color-blood)' />
        {cities.map((c) => (
          <g key={c.label}>
            <line
              x1='70'
              y1='70'
              x2={c.x}
              y2={c.y}
              stroke='var(--color-line-soft)'
              strokeWidth='1'
            />
            <circle cx={c.x} cy={c.y} r='3' fill='var(--color-pulse-teal)' />
            <text
              x={c.x + 6}
              y={c.y + 3}
              fontSize='7'
              fontFamily='var(--font-data)'
              fill='var(--color-line)'
            >
              {c.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function NetworkVisual() {
  const groups = ['O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'];
  const points = groups.map((g, i) => {
    const angle = (i / groups.length) * Math.PI * 2 - Math.PI / 2;
    return {
      label: g,
      x: 90 + Math.cos(angle) * 70,
      y: 90 + Math.sin(angle) * 70,
    };
  });

  return (
    <div className='h-72 border border-line-soft bg-paper-raised flex items-center justify-center'>
      <svg viewBox='0 0 180 180' className='w-56 h-56'>
        {points.map((p, i) =>
          points.map((q, j) =>
            i < j ? (
              <line
                key={`${i}-${j}`}
                x1={p.x}
                y1={p.y}
                x2={q.x}
                y2={q.y}
                stroke='var(--color-line-soft)'
                strokeWidth='0.5'
              />
            ) : null,
          ),
        )}
        {points.map((p) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r='12'
              fill='var(--color-paper-raised)'
              stroke='var(--color-blood)'
              strokeWidth='1.5'
            />
            <text
              x={p.x}
              y={p.y + 3}
              fontSize='8'
              fontFamily='var(--font-data)'
              textAnchor='middle'
              fill='var(--color-ink)'
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
