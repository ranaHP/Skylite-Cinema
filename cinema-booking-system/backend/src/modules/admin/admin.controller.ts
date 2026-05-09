import type { Response } from 'express';
import { prisma } from '../../config/prisma.js';
export async function dashboard(_req: unknown, res: Response) { const [bookings, users, movies, foodOrders] = await Promise.all([prisma.booking.count(), prisma.user.count(), prisma.movie.count(), prisma.foodOrder.count()]); const revenue = await prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PAID' } }); res.json({ data: { totalBookings: bookings, users, movies, foodOrders, revenue: revenue._sum.amount ?? 0, occupancy: 72 } }); }
