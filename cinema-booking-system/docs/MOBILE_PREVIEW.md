# Mobile App Preview Guide

SkyLite Cinema is optimized as a mobile-first responsive web app and can be tested like an installable mobile app.

## Browser device preview

1. Start the stack:
   ```bash
   cd cinema-booking-system
   npm install
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   npm run dev
   ```
2. Open `http://localhost:5173`.
3. In Chrome or Edge DevTools, enable device toolbar and test these widths:
   - iPhone SE: `375px`
   - iPhone 15 Pro: `393px`
   - Pixel 7: `412px`
   - Foldable narrow pane: `344px`
   - Tablet: `768px`

## Real phone on the same Wi-Fi

1. Find your computer's LAN IP, for example `192.168.1.20`.
2. Keep Vite running; it is configured with `--host 0.0.0.0`.
3. On your phone, open `http://192.168.1.20:5173`.
4. If testing API calls from a physical device, set `frontend/.env` to your LAN API URL:
   ```env
   VITE_API_URL=http://192.168.1.20:4000/api
   VITE_SOCKET_URL=http://192.168.1.20:4000
   ```
5. Set `backend/.env` CORS to match the phone-facing frontend URL:
   ```env
   CORS_ORIGIN=http://192.168.1.20:5173
   ```

## Installable app behavior

The frontend includes mobile web app metadata and a web manifest, so mobile browsers can add it to the home screen in standalone portrait mode.
