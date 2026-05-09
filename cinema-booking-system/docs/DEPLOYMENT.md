# Production Deployment Notes

## Infrastructure

- Frontend: deploy `frontend/dist` to Vercel, Netlify, Cloudflare Pages, or an S3/CloudFront static origin.
- Backend: deploy the Node.js API to a container platform such as Fly.io, Render, ECS, Kubernetes, or a VM behind Nginx.
- Database: managed MySQL 8 with automated backups, point-in-time restore, and private network access.
- Assets: use Cloudinary or S3-compatible object storage for posters, banners, and food images.
- Email: configure SMTP credentials for Nodemailer.

## Build

```bash
npm ci
npm run build
npm run seed
npm run start --workspace backend
```

## Security checklist

- Set strong `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` values.
- Use HTTPS only; terminate TLS at the load balancer or reverse proxy.
- Restrict CORS to the production frontend origin.
- Store secrets in platform secret managers, not in `.env` committed files.
- Enable MySQL SSL connections and least-privilege database users.
- Monitor Winston JSON logs with a centralized log system.
- Keep Helmet, rate limiting, RBAC, Zod validation, and Prisma transactions enabled.

## Scaling realtime booking

For multiple backend replicas, configure a Socket.io Redis adapter and run the seat-lock expiry job as a single scheduled worker. Database transactions remain the source of truth for final booking creation.
