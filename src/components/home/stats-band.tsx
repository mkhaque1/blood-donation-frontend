const stats = [
  {
    value: '8',
    label: 'blood groups matched by full ABO/Rh compatibility rules',
  },
  {
    value: '3',
    label:
      'dedicated roles — donor, requester, and admin — each with their own tools',
  },
  {
    value: '90-day',
    label: 'eligibility window enforced automatically after every donation',
  },
  {
    value: 'Real-time',
    label: 'status tracking from request to completed donation',
  },
];

export function StatsBand() {
  return (
    <section className='mx-auto max-w-6xl px-6 py-20'>
      <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
        {stats.map((stat) => (
          <div key={stat.label}>
            <span className='font-mono text-3xl font-semibold text-ink'>
              {stat.value}
            </span>
            <p className='mt-2 text-sm text-ink-soft'>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
