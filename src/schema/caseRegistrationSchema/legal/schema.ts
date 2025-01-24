import { z } from 'zod';

export const shippingSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
});

export const paymentSchema = z.object({
  cardNumber: z.string().min(16, 'Card number is required'),
  expirationDate: z.string().min(5, 'Expiration date is required'),
  cvv: z.string().min(3, 'CVV is required'),
});