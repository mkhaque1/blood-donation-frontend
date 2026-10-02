'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateBloodRequest } from '@/hooks/use-requester';
import {
  requestStepOneSchema,
  requestStepTwoSchema,
  requestStepThreeSchema,
  fullRequestSchema,
  type RequestFormValues,
} from '@/lib/validation/blood-request';
import { ApiError } from '@/lib/api-types';
import { cn } from '@/lib/utils';

const bloodGroups = [
  'A_POS',
  'A_NEG',
  'B_POS',
  'B_NEG',
  'AB_POS',
  'AB_NEG',
  'O_POS',
  'O_NEG',
];
const steps = ['Patient & blood type', 'Location', 'Urgency & timing'];
const stepSchemas = [
  requestStepOneSchema,
  requestStepTwoSchema,
  requestStepThreeSchema,
];

export function CreateRequestWizard() {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const createRequest = useCreateBloodRequest();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(fullRequestSchema),
    defaultValues: { urgency: 'NORMAL' },
  });

  const bloodGroup = watch('bloodGroup');
  const urgency = watch('urgency');

  const handleNext = async () => {
    // Validate only the current step's fields before advancing.
    const fieldNames = Object.keys(
      stepSchemas[step].shape,
    ) as (keyof RequestFormValues)[];
    const valid = await trigger(fieldNames);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (values: RequestFormValues) => {
    const payload = {
      ...values,
      neededBy: new Date(values.neededBy).toISOString(),
    };
    createRequest.mutate(payload, {
      onSuccess: () => {
        toast.success('Request submitted — pending admin verification.');
        router.push('/dashboard');
      },
      onError: (err) => {
        const message =
          err instanceof ApiError ? err.message : "Couldn't submit request";
        toast.error(message);
      },
    });
  };

  return (
    <div className='max-w-xl'>
      <div className='flex items-center gap-2 mb-8'>
        {steps.map((label, i) => (
          <div key={label} className='flex items-center gap-2 flex-1'>
            <div
              className={cn(
                'flex items-center justify-center size-7 shrink-0 font-mono text-xs border',
                i === step
                  ? 'border-ink bg-ink text-paper'
                  : i < step
                    ? 'border-pulse-teal bg-pulse-teal-soft text-pulse-teal'
                    : 'border-line-soft text-line',
              )}
            >
              {i + 1}
            </div>
            <span
              className={cn(
                'text-xs hidden sm:block',
                i === step ? 'text-ink' : 'text-line',
              )}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className='flex-1 h-px bg-line-soft' />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 && (
          <div className='space-y-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='patientName'>Patient name</Label>
              <Input
                id='patientName'
                {...register('patientName')}
                aria-invalid={!!errors.patientName}
              />
              {errors.patientName && (
                <p className='text-xs text-blood'>
                  {errors.patientName.message}
                </p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label>Blood group needed</Label>
              <div className='grid grid-cols-4 gap-2'>
                {bloodGroups.map((g) => (
                  <button
                    key={g}
                    type='button'
                    onClick={() =>
                      setValue('bloodGroup', g, { shouldValidate: true })
                    }
                    className={cn(
                      'border px-3 py-2.5 text-sm font-mono transition-colors',
                      bloodGroup === g
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line-soft hover:border-ink',
                    )}
                  >
                    {g.replace('_POS', '+').replace('_NEG', '−')}
                  </button>
                ))}
              </div>
              {errors.bloodGroup && (
                <p className='text-xs text-blood'>
                  {errors.bloodGroup.message}
                </p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label htmlFor='unitsNeeded'>Units needed</Label>
              <Input
                id='unitsNeeded'
                type='number'
                min={1}
                {...register('unitsNeeded', { valueAsNumber: true })}
                aria-invalid={!!errors.unitsNeeded}
              />
              {errors.unitsNeeded && (
                <p className='text-xs text-blood'>
                  {errors.unitsNeeded.message}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className='space-y-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='hospitalName'>Hospital name</Label>
              <Input
                id='hospitalName'
                {...register('hospitalName')}
                aria-invalid={!!errors.hospitalName}
              />
              {errors.hospitalName && (
                <p className='text-xs text-blood'>
                  {errors.hospitalName.message}
                </p>
              )}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1.5'>
                <Label htmlFor='city'>City</Label>
                <Input
                  id='city'
                  {...register('city')}
                  aria-invalid={!!errors.city}
                />
                {errors.city && (
                  <p className='text-xs text-blood'>{errors.city.message}</p>
                )}
              </div>
              <div className='space-y-1.5'>
                <Label htmlFor='area'>Area</Label>
                <Input
                  id='area'
                  {...register('area')}
                  aria-invalid={!!errors.area}
                />
                {errors.area && (
                  <p className='text-xs text-blood'>{errors.area.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='space-y-4'>
            <div className='space-y-1.5'>
              <Label>Urgency</Label>
              <div className='grid grid-cols-3 gap-2'>
                {(['NORMAL', 'URGENT', 'CRITICAL'] as const).map((level) => (
                  <button
                    key={level}
                    type='button'
                    onClick={() => setValue('urgency', level)}
                    className={cn(
                      'border px-3 py-2.5 text-sm font-mono transition-colors',
                      urgency === level
                        ? 'border-blood bg-blood/10 text-blood'
                        : 'border-line-soft hover:border-ink',
                    )}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='neededBy'>Needed by</Label>
              <Input
                id='neededBy'
                type='date'
                {...register('neededBy')}
                aria-invalid={!!errors.neededBy}
              />
              {errors.neededBy && (
                <p className='text-xs text-blood'>{errors.neededBy.message}</p>
              )}
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='notes'>Notes (optional)</Label>
              <textarea
                id='notes'
                rows={3}
                {...register('notes')}
                className='w-full border border-line-soft bg-paper-raised px-3 py-2 text-sm'
              />
            </div>
          </div>
        )}

        <div className='mt-8 flex justify-between'>
          <Button
            type='button'
            variant='outline'
            onClick={handleBack}
            disabled={step === 0}
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button type='button' onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button
              type='submit'
              variant='emergency'
              disabled={createRequest.isPending}
            >
              {createRequest.isPending ? 'Submitting…' : 'Submit request'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
