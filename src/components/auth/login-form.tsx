'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/hooks/use-auth';
import { loginSchema, type LoginValues } from '@/lib/validation/auth';
import { ApiError } from '@/lib/api-types';

export function LoginForm() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (values: LoginValues) => {
    login.mutate(values, {
      onError: (err) => {
        const message = err instanceof ApiError ? err.message : 'Login failed';
        toast.error(message);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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

      <Button type='submit' className='w-full' disabled={login.isPending}>
        {login.isPending ? 'Logging in…' : 'Log in'}
      </Button>
    </form>
  );
}
