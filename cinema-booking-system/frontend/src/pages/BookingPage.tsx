import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, ShieldCheck } from 'lucide-react';
import { SeatMap } from '../components/SeatMap';
import { cinemas, movies, seats, shows } from '../data';
import type { Seat } from '../types/domain';
import { money } from '../utils/format';

export function BookingPage() {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === movieId) ?? movies[0];
  const show = shows.find((item) => item.movieId === movie.id) ?? shows[0];
  const cinema = cinemas.find((item) => item.id === show.cinemaId)!;
  const [selected, setSelected] = useState<string[]>(['A5', 'C6', 'F7']);
  const total = useMemo(
    () => seats.filter((seat) => selected.includes(seat.id)).reduce((amount, seat) => amount + seat.price, 0),
    [selected],
  );

  function toggle(seat: Seat) {
    setSelected((value) => (value.includes(seat.id) ? value.filter((id) => id !== seat.id) : [...value, seat.id]));
  }

  return (
    <div className="mx-auto max-w-3xl py-4 md:py-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-muted">{cinema.name}</p>
          <h1 className="truncate text-2xl font-bold">{movie.title}</h1>
        </div>
        <Link to={`/movies/${movie.id}`} className="mobile-hit-target grid shrink-0 place-items-center rounded-full bg-white/10">
          <Heart size={20} />
        </Link>
      </div>

      <SeatMap seats={seats} selected={selected} onToggle={toggle} />

      <div className="mt-6 space-y-5 md:mt-7">
        <Pick title="Select Date" items={['Sat 23 May', 'Sun 24 May', 'Mon 25 May', 'Tue 26 May']} />
        <Pick title="Select Time" items={['7:50 PM', '10:20 PM', '12:30 PM']} />

        <div className="glass flex items-center justify-between gap-4 rounded-[28px] p-4 md:p-5">
          <div className="min-w-0">
            <p className="text-sm text-muted">{show.hall} • Seats</p>
            <h2 className="truncate text-xl font-bold">{selected.join(', ') || 'Choose seats'}</h2>
            <p className="text-sm text-muted">({selected.length} Tickets)</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-muted">Total Price</p>
            <b className="text-2xl text-ember">{money(total)}</b>
          </div>
        </div>

        <Link to="/checkout" className="mobile-hit-target block rounded-2xl bg-ember-gradient px-6 py-4 text-center font-bold shadow-glow">
          Book Now
        </Link>
        <p className="flex items-center justify-center gap-2 text-xs text-muted">
          <ShieldCheck size={14} className="text-ember" /> Your booking is safe and secure
        </p>
      </div>
    </div>
  );
}

function Pick({ title, items }: { title: string; items: string[] }) {
  const [active, setActive] = useState(items[0]);

  return (
    <div>
      <h3 className="mb-3 font-semibold">{title}</h3>
      <div className="cinema-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
        {items.map((item) => (
          <button
            type="button"
            onClick={() => setActive(item)}
            className={`mobile-hit-target shrink-0 rounded-2xl px-4 py-3 text-sm ${active === item ? 'bg-ember-gradient' : 'glass text-muted'}`}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
