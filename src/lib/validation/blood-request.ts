import { z } from 'zod';

export const requestStepOneSchema = z.object({
  patientName: z.string().min(2, "Enter the patient's name"),
  bloodGroup: z.string().min(1, 'Select a blood group'),
  unitsNeeded: z.coerce.number().int().positive('Enter at least 1 unit'),
});

export const requestStepTwoSchema = z.object({
  hospitalName: z.string().min(2, 'Enter the hospital name'),
  city: z.string().min(2, 'City is required'),
  area: z.string().min(2, 'Area is required'),
});

export const requestStepThreeSchema = z.object({
  urgency: z.enum(['NORMAL', 'URGENT', 'CRITICAL']),
  neededBy: z.string().min(1, 'Select a date'),
  notes: z.string().optional(),
});

export const fullRequestSchema = requestStepOneSchema
  .merge(requestStepTwoSchema)
  .merge(requestStepThreeSchema);

export type RequestFormValues = z.infer<typeof fullRequestSchema>;
