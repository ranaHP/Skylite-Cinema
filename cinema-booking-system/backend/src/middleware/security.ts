import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { Express } from 'express';
import { env } from '../config/env.js';
export function applySecurity(app: Express) { app.use(helmet()); app.use(cors({ origin: env.CORS_ORIGIN, credentials: true })); app.use(compression()); app.use(rateLimit({ windowMs: 60_000, limit: 160, standardHeaders: true, legacyHeaders: false })); }
