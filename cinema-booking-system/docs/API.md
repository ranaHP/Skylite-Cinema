# SkyLite Cinema API Documentation

Base URL: `http://localhost:4000/api`

## Authentication

### POST `/auth/register`
Creates a customer account.

```json
{ "name": "Ahmed Nabil", "email": "customer@example.com", "password": "Password123!", "phone": "+201000000000" }
```

### POST `/auth/login`
Returns JWT access and refresh tokens.

```json
{ "email": "customer@moviehub.test", "password": "Password123!" }
```

### GET `/auth/me`
Requires `Authorization: Bearer <token>`.

## Movies and food

- `GET /movies?status=NOW_SHOWING&q=dune` — list movies with images, genres, ratings.
- `GET /movies/:id` — movie details with showtimes, cinemas, halls, and reviews.
- `GET /food` — food categories and enabled food items.

## Booking and tickets

### POST `/bookings/lock`
Temporarily locks seats and rejects already locked/booked seats.

```json
{ "showId": "show_id", "seatIds": ["seat_id_1", "seat_id_2"] }
```

### POST `/bookings`
Creates a transaction-safe booking, marks seats booked, stores payment, generates a QR ticket, writes an audit log, and queues email.

```json
{
  "showId": "show_id",
  "seatIds": ["seat_id_1"],
  "foodItems": [{ "foodItemId": "food_id", "quantity": 2 }],
  "paymentMethod": "CARD",
  "couponCode": "AMBER10"
}
```

### POST `/tickets/validate`
Staff/admin only. Marks a valid ticket as used exactly once.

```json
{ "qrCode": "MOVIE_HUB:BK45:booking_id" }
```

## Admin

- `GET /admin/dashboard` — bookings, users, movie count, food order count, revenue, occupancy.
- `POST /admin/uploads` — poster/banner upload via multipart `asset` field.

## Socket.io events

- `show:join` with `showId` joins a show room.
- `seat:lock` with `{ showId, seatIds, userId }` emits `seat:locked`.
- `seat:release` emits `seat:released`.

Seat locks are automatically purged every 30 seconds after expiry.
