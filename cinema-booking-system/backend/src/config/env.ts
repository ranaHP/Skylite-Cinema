import 'dotenv/config';
import { z } from 'zod';
const schema = z.object({ NODE_ENV: z.enum(['development','test','production']).default('development'), PORT: z.coerce.number().default(4000), DATABASE_URL: z.string().default('mysql://root:password@localhost:3306/movie_hub'), JWT_ACCESS_SECRET: z.string().default('dev_access_secret'), JWT_REFRESH_SECRET: z.string().default('dev_refresh_secret'), JWT_ACCESS_EXPIRES_IN: z.string().default('15m'), JWT_REFRESH_EXPIRES_IN: z.string().default('7d'), CORS_ORIGIN: z.string().default('http://localhost:5173'), BOOKING_LOCK_SECONDS: z.coerce.number().default(420), UPLOAD_DRIVER: z.enum(['local','cloudinary']).default('local') });
export const env = schema.parse(process.env);
