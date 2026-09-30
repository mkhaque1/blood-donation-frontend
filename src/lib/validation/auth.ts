import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    role: z.enum(['DONOR', 'REQUESTER']),
    email: z.email('Enter a valid email address'),
    password: z.string().min(8, 'At least 8 characters'),
    fullName: z.string().min(2, 'Enter your full name'),
    phone: z.string().min(6, 'Enter a valid phone number'),
    city: z.string().min(2, 'City is required'),
    area: z.string().min(2, 'Area is required'),
    bloodGroup: z.string().optional(),
    dateOfBirth: z.string().optional(),
    weightKg: z.coerce.number().optional(),
    organizationType: z.string().optional(),
    organizationName: z.string().optional(),
  })
  .refine((data) => data.role !== 'DONOR' || !!data.bloodGroup, {
    message: 'Blood group is required for donors',
    path: ['bloodGroup'],
  })
  .refine((data) => data.role !== 'DONOR' || !!data.dateOfBirth, {
    message: 'Date of birth is required for donors',
    path: ['dateOfBirth'],
  })
  .refine((data) => data.role !== 'DONOR' || !!data.weightKg, {
    message: 'Weight is required for donors',
    path: ['weightKg'],
  });

export type RegisterValues = z.infer<typeof registerSchema>;

export type LoginValues = z.infer<typeof loginSchema>;
