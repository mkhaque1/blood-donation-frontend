'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { contactSchema, type ContactValues } from '@/lib/validation/contact';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    // No backend /contact endpoint exists yet — this validates and confirms
    // client-side. Swap for a real apiClient.post("/contact", values) if
    // you add that route to the backend later.
    await new Promise((r) => setTimeout(r, 600));
    toast.success(`Thanks, ${values.name} — we'll get back to you soon.`);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 border border-line-soft p-6'
    >
      <div className='space-y-1.5'>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' {...register('name')} aria-invalid={!!errors.name} />
        {errors.name && (
          <p className='text-xs text-blood'>{errors.name.message}</p>
        )}
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
        <Label htmlFor='message'>Message</Label>
        <textarea
          id='message'
          rows={5}
          {...register('message')}
          className='w-full border border-line-soft bg-paper-raised px-3 py-2 text-sm'
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className='text-xs text-blood'>{errors.message.message}</p>
        )}
      </div>
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}
