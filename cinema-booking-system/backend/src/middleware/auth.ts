import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/tokens.js';
declare global { namespace Express { interface Request { user?: { id: string; role: string; email: string } } } }
export function requireAuth(req: Request, res: Response, next: NextFunction) { const header = req.headers.authorization; if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing bearer token' }); try { const payload = verifyAccessToken(header.slice(7)); req.user = { id: payload.sub, role: payload.role, email: payload.email }; return next(); } catch { return res.status(401).json({ message: 'Invalid or expired token' }); } }
export function requireRole(...roles: string[]) { return (req: Request, res: Response, next: NextFunction) => { if (!req.user) return res.status(401).json({ message: 'Unauthorized' }); if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' }); next(); }; }
