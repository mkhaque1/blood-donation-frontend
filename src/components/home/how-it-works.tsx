const steps = [
  {
    number: '01',
    title: 'A request is submitted and verified',
    description:
      'A patient or hospital submits the blood need. An admin verifies it before it reaches any donor.',
  },
  {
    number: '02',
    title: 'Compatible donors are matched',
    description:
      'The system filters by blood group compatibility, city, availability, and medical eligibility — automatically.',
  },
  {
    number: '03',
    title: 'A donor accepts, and the request closes',
    description:
      'The first eligible donor to accept is assigned. The request is marked complete once the donation happens.',
  },
];

export function HowItWorks() {
  return (
    <section className='mx-auto max-w-6xl px-6 py-20'>
      <h2 className='font-display text-3xl font-semibold max-w-[20ch]'>
        How a request gets filled
      </h2>
      <div className='mt-10 grid gap-8 md:grid-cols-3'>
        {steps.map((step) => (
          <div key={step.number} className='border-t-2 border-ink pt-4'>
            <span className='font-mono text-sm text-line'>{step.number}</span>
            <h3 className='mt-2 font-display text-lg font-semibold'>
              {step.title}
            </h3>
            <p className='mt-2 text-sm text-ink-soft'>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
