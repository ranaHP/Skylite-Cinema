import { z } from 'zod';
export const lockSeatsSchema = z.object({ showId: z.string(), seatIds: z.array(z.string()).min(1).max(10) });
export const createBookingSchema = z.object({ showId: z.string(), seatIds: z.array(z.string()).min(1).max(10), foodItems: z.array(z.object({ foodItemId: z.string(), quantity: z.number().int().positive() })).default([]), couponCode: z.string().optional(), paymentMethod: z.enum(['CARD','CASH','WALLET','ONLINE']) });
