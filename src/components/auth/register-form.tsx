'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegister } from '@/hooks/use-auth';
import { registerSchema, type RegisterValues } from '@/lib/validation/auth';
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

export function RegisterForm() {
  const searchParams = useSearchParams();
  const initialRole =
    searchParams.get('role') === 'donor' ? 'DONOR' : 'REQUESTER';
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema) as never,
    defaultValues: { role: initialRole, organizationType: 'INDIVIDUAL' },
  });

  const role = watch('role');

  const onSubmit: SubmitHandler<RegisterValues> = (values) => {
    registerMutation.mutate(values, {
      onError: (err) => {
        const message =
          err instanceof ApiError ? err.message : 'Registration failed';
        toast.error(message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
      <div>
        <Label className='mb-2 block'>I am a</Label>
        <div className='grid grid-cols-2 gap-3'>
          {(['DONOR', 'REQUESTER'] as const).map((r) => (
            <button
              key={r}
              type='button'
              onClick={() => setValue('role', r)}
              className={cn(
                'border px-4 py-2.5 text-sm font-medium transition-colors',
                role === r
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line-soft text-ink-soft hover:border-ink',
              )}
            >
              {r === 'DONOR' ? 'Donor' : 'Patient / Hospital'}
            </button>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label htmlFor='fullName'>Full name</Label>
          <Input
            id='fullName'
            {...register('fullName')}
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className='text-xs text-blood'>{errors.fullName.message}</p>
          )}
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='phone'>Phone</Label>
          <Input
            id='phone'
            {...register('phone')}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <p className='text-xs text-blood'>{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className='text-xs text-blood'>{errors.email.message}</p>
        )}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className='text-xs text-blood'>{errors.password.message}</p>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-1.5'>
          <Label htmlFor='city'>City</Label>
          <Input id='city' {...register('city')} aria-invalid={!!errors.city} />
          {errors.city && (
            <p className='text-xs text-blood'>{errors.city.message}</p>
          )}
        </div>
        <div className='space-y-1.5'>
          <Label htmlFor='area'>Area</Label>
          <Input id='area' {...register('area')} aria-invalid={!!errors.area} />
          {errors.area && (
            <p className='text-xs text-blood'>{errors.area.message}</p>
          )}
        </div>
      </div>

      {role === 'DONOR' && (
        <div className='space-y-4 border-t border-line-soft pt-4'>
          <div className='space-y-1.5'>
            <Label htmlFor='bloodGroup'>Blood group</Label>
            <select
              id='bloodGroup'
              {...register('bloodGroup')}
              className='h-10 w-full border border-line-soft bg-paper-raised px-3 text-sm'
            >
              <option value=''>Select your blood group</option>
              {bloodGroups.map((g) => (
                <option key={g} value={g}>
                  {g.replace('_POS', '+').replace('_NEG', '−')}
                </option>
              ))}
            </select>
            {errors.bloodGroup && (
              <p className='text-xs text-blood'>{errors.bloodGroup.message}</p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1.5'>
              <Label htmlFor='dateOfBirth'>Date of birth</Label>
              <Input
                id='dateOfBirth'
                type='date'
                {...register('dateOfBirth')}
                aria-invalid={!!errors.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <p className='text-xs text-blood'>
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div className='space-y-1.5'>
              <Label htmlFor='weightKg'>Weight (kg)</Label>
              <Input
                id='weightKg'
                type='number'
                {...register('weightKg')}
                aria-invalid={!!errors.weightKg}
              />
              {errors.weightKg && (
                <p className='text-xs text-blood'>{errors.weightKg.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {role === 'REQUESTER' && (
        <div className='space-y-4 border-t border-line-soft pt-4'>
          <div className='space-y-1.5'>
            <Label htmlFor='organizationType'>Registering as</Label>
            <select
              id='organizationType'
              {...register('organizationType')}
              className='h-10 w-full border border-line-soft bg-paper-raised px-3 text-sm'
            >
              <option value='INDIVIDUAL'>Individual / Patient</option>
              <option value='HOSPITAL'>Hospital</option>
            </select>
          </div>
          <div className='space-y-1.5'>
            <Label htmlFor='organizationName'>
              Hospital name (if applicable)
            </Label>
            <Input id='organizationName' {...register('organizationName')} />
          </div>
        </div>
      )}

      <Button
        type='submit'
        className='w-full'
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  );
}
