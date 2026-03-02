import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  message: z.string().min(8, 'Must be at least 8 characters').optional().or(z.literal('')),
  designLength: z.string().optional(),
  designRange: z.string().optional(),
  circumferenceLength: z.string().optional(),
  circumferenceRange: z.string().optional(),
  resistanceLength: z.string().optional(),
  resistanceRange: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
