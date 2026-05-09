import type { Booking, Cinema, FoodItem, Movie, Seat, Show } from './types/domain';
export const movies: Movie[] = [
 { id:'dune-2', title:'Dune: Part Two', status:'NOW_SHOWING', genre:'Sci‑Fi, Adventure', language:'English', rating:8.8, duration:'2h 46m', ageRating:'PG-13', poster:'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=600&q=80', banner:'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1600&q=80', synopsis:'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', trailerUrl:'https://www.youtube.com/watch?v=Way9Dexny3w', cast:['Timothée Chalamet','Zendaya','Rebecca Ferguson','Javier Bardem'] },
 { id:'rover', title:'The Rover', status:'NOW_SHOWING', genre:'Drama, Sci‑Fi, Thriller', language:'English', rating:8.1, duration:'1h 52m', ageRating:'R', poster:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', banner:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80', synopsis:'A tense desert odyssey about loyalty, survival, and what remains after society falls away.', trailerUrl:'#', cast:['Guy Pearce','Robert Pattinson','Scoot McNairy'] },
 { id:'nebula', title:'Nebula Run', status:'COMING_SOON', genre:'Action, Space Opera', language:'English', rating:0, duration:'2h 06m', ageRating:'PG-13', poster:'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80', banner:'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80', synopsis:'A smuggler crew races through a collapsing nebula to save the last passenger colony.', trailerUrl:'#', cast:['Aisha Hart','Daniel Kaluuya','Gemma Chan'] }
];
export const cinemas: Cinema[] = [
 { id:'cairo-festival', name:'Cairo Festival City Cinema', distance:'3.2 km', rating:4.6, address:'Festival Avenue, Screen 5', premium:true },
 { id:'citystars', name:'Citystars Cinema', distance:'5.6 km', rating:4.8, address:'Omar Ibn El Khattab, Screen 2', premium:true },
 { id:'mall-arabia', name:'Mall of Arabia Cinema', distance:'7.8 km', rating:4.5, address:'Gate 9, Premium Hall', premium:false }
];
export const shows: Show[] = [
 { id:'show-1', movieId:'dune-2', cinemaId:'cairo-festival', hall:'Screen 5', date:'2026-05-23', time:'7:50 PM', basePrice:24, occupancy:72 },
 { id:'show-2', movieId:'dune-2', cinemaId:'citystars', hall:'Screen 2', date:'2026-05-24', time:'10:20 PM', basePrice:26, occupancy:64 },
 { id:'show-3', movieId:'rover', cinemaId:'mall-arabia', hall:'Screen 8', date:'2026-05-25', time:'12:30 PM', basePrice:18, occupancy:51 }
];
export const seats: Seat[] = Array.from({ length: 8 }).flatMap((_, r) => Array.from({ length: 10 }).map((__, n) => ({ id:`${String.fromCharCode(65+r)}${n+1}`, row:String.fromCharCode(65+r), number:n+1, type:r>5?'VIP':r>2?'PREMIUM':'STANDARD', price:r>5?34:r>2?28:22, state: (['A6','C9','C10','D5','D6','D10'].includes(`${String.fromCharCode(65+r)}${n+1}`) ? 'booked' : 'available') as const })));
export const food: FoodItem[] = [
 { id:'combo-1', category:'Combos', name:'Amber Couple Combo', price:18, image:'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=400&q=80', stock:32, combo:true },
 { id:'popcorn', category:'Snacks', name:'Truffle Popcorn', price:9, image:'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80', stock:120, combo:false },
 { id:'mocha', category:'Drinks', name:'Iced Cinema Mocha', price:7, image:'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80', stock:85, combo:false }
];
export const demoBooking: Booking = { id:'BK45', movie:movies[0], cinema:cinemas[0], show:shows[0], seats: seats.filter(s=>['A5','C6','F7'].includes(s.id)).map(s=>({...s,state:'selected'})), total:72, status:'CONFIRMED', qrCode:'BK45-DUNE-2026-05-23-A5-C6-F7' };
