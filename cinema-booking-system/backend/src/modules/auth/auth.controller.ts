import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import { prisma } from '../../config/prisma.js';
import { loginSchema, registerSchema } from '../../validators/auth.js';
import { signAccessToken, signRefreshToken } from '../../utils/tokens.js';
function tokens(user: { id: string; email: string; role: { name: string } }) { const payload = { sub: user.id, email: user.email, role: user.role.name }; return { accessToken: signAccessToken(payload), refreshToken: signRefreshToken(payload) }; }
export async function register(req: Request, res: Response) { const body = registerSchema.parse(req.body); const passwordHash = await bcrypt.hash(body.password, 12); const role = await prisma.role.findUniqueOrThrow({ where: { name: 'CUSTOMER' } }); const user = await prisma.user.create({ data: { name: body.name, email: body.email, phone: body.phone, passwordHash, roleId: role.id }, include: { role: true } }); res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role.name }, ...tokens(user) }); }
export async function login(req: Request, res: Response) { const body = loginSchema.parse(req.body); const user = await prisma.user.findUnique({ where: { email: body.email }, include: { role: true } }); if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) return res.status(401).json({ message: 'Invalid credentials' }); if (user.blockedAt) return res.status(403).json({ message: 'User is blocked' }); res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role.name }, ...tokens(user) }); }
export async function me(req: Request, res: Response) { const user = await prisma.user.findUnique({ where: { id: req.user!.id }, include: { role: true } }); res.json({ user }); }
