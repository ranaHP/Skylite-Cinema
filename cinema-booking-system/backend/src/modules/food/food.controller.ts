import type { Response } from 'express';
import { prisma } from '../../config/prisma.js';
export async function listFood(_req: unknown, res: Response) { const categories = await prisma.foodCategory.findMany({ include: { items: { where: { enabled: true } } }, orderBy: { sortOrder: 'asc' } }); res.json({ data: categories }); }
