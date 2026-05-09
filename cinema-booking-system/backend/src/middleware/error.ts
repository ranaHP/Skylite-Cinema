import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger.js';
export function notFound(req: Request, res: Response) { res.status(404).json({ message: `Route ${req.method} ${req.path} not found` }); }
export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) { if (error instanceof ZodError) return res.status(422).json({ message: 'Validation failed', issues: error.flatten() }); logger.error('Unhandled error', { error }); res.status(500).json({ message: 'Internal server error' }); }
