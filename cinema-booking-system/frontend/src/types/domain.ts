export type Role = 'SUPER_ADMIN' | 'CINEMA_ADMIN' | 'STAFF' | 'CUSTOMER';
export type SeatState = 'available' | 'selected' | 'booked' | 'locked' | 'reserved';
export interface Movie { id: string; title: string; status: 'NOW_SHOWING' | 'COMING_SOON'; genre: string; language: string; rating: number; duration: string; ageRating: string; poster: string; banner: string; synopsis: string; trailerUrl: string; cast: string[]; }
export interface Cinema { id: string; name: string; distance: string; rating: number; address: string; premium: boolean; }
export interface Show { id: string; movieId: string; cinemaId: string; hall: string; date: string; time: string; basePrice: number; occupancy: number; }
export interface Seat { id: string; row: string; number: number; type: 'STANDARD' | 'PREMIUM' | 'VIP'; price: number; state: SeatState; }
export interface Booking { id: string; movie: Movie; cinema: Cinema; show: Show; seats: Seat[]; total: number; status: 'CONFIRMED' | 'PENDING' | 'CANCELLED'; qrCode: string; }
export interface FoodItem { id: string; category: string; name: string; price: number; image: string; stock: number; combo: boolean; }
