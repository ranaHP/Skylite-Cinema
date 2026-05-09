import multer from 'multer';
import path from 'node:path';
const storage = multer.diskStorage({ destination: 'uploads', filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.]/g,'-')}`) });
export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, ['.jpg','.jpeg','.png','.webp'].includes(path.extname(file.originalname).toLowerCase())) });
