import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';
export async function sendBookingEmail(to: string, bookingId: string) { const transport = nodemailer.createTransport({ jsonTransport: true }); const info = await transport.sendMail({ to, from: 'tickets@moviehub.local', subject: `Movie Hub booking ${bookingId}`, text: `Your booking ${bookingId} is confirmed. Your QR ticket is attached in the app.` }); logger.info('Booking email queued', { messageId: info.messageId, to }); }
