-- Operational reporting helpers for Movie Hub / Lite Cinema.
CREATE OR REPLACE VIEW v_daily_revenue AS
SELECT DATE(p.createdAt) AS revenue_date, COUNT(*) AS payments, SUM(p.amount) AS gross_revenue
FROM payments p
WHERE p.status = 'PAID'
GROUP BY DATE(p.createdAt);

CREATE OR REPLACE VIEW v_show_occupancy AS
SELECT s.id AS show_id, m.title, c.name AS cinema, h.name AS hall,
       SUM(CASE WHEN ss.status = 'BOOKED' THEN 1 ELSE 0 END) AS booked_seats,
       COUNT(ss.id) AS total_seats,
       ROUND(SUM(CASE WHEN ss.status = 'BOOKED' THEN 1 ELSE 0 END) / COUNT(ss.id) * 100, 2) AS occupancy_percentage
FROM shows s
JOIN movies m ON m.id = s.movieId
JOIN cinemas c ON c.id = s.cinemaId
JOIN halls h ON h.id = s.hallId
JOIN show_seats ss ON ss.showId = s.id
GROUP BY s.id, m.title, c.name, h.name;
