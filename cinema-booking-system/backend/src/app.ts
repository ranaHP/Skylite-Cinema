import express from 'express';
import { applySecurity } from './middleware/security.js';
import { errorHandler, notFound } from './middleware/error.js';
import { router } from './routes/index.js';
export function createApp() { const app = express(); applySecurity(app); app.use(express.json({ limit: '2mb' })); app.use('/uploads', express.static('uploads')); app.use('/api', router); app.use(notFound); app.use(errorHandler); return app; }
