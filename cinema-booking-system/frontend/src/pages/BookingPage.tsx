import { useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Building2, CalendarDays, Check, ChevronRight, Clock3, Heart, MapPin, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react';
import { SeatMap } from '../components/SeatMap';
import { cinemas, movies, seats, shows } from '../data';
import type { Seat, Show } from '../types/domain';
import { money, shortDate } from '../utils/format';

const steps = ['Theater', 'Showtime', 'Time', 'Seats'];

export function BookingPage() {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === movieId) ?? movies[0];
  const movieShows = shows.filter((item) => item.movieId === movie.id);
  const fallbackShow = movieShows[0] ?? shows[0];
  const [selectedCinemaId, setSelectedCinemaId] = useState(fallbackShow.cinemaId);
  const cinemaShows = movieShows.filter((item) => item.cinemaId === selectedCinemaId);
  const availableDates = [...new Set(cinemaShows.map((item) => item.date))];
  const [selectedDate, setSelectedDate] = useState(availableDates[0] ?? fallbackShow.date);
  const dateShows = cinemaShows.filter((item) => item.date === selectedDate);
  const [selectedShowId, setSelectedShowId] = useState((dateShows[0] ?? cinemaShows[0] ?? fallbackShow).id);
  const selectedShow = movieShows.find((item) => item.id === selectedShowId) ?? dateShows[0] ?? fallbackShow;
  const selectedCinema = cinemas.find((item) => item.id === selectedShow.cinemaId) ?? cinemas[0];
  const [selected, setSelected] = useState<string[]>(['A5', 'C6', 'F7']);
  const total = useMemo(
    () => seats.filter((seat) => selected.includes(seat.id)).reduce((amount, seat) => amount + seat.price, 0),
    [selected],
  );

  const activeStep = selected.length ? 3 : selectedShowId ? 2 : selectedDate ? 1 : 0;

  function selectCinema(cinemaId: string) {
    const nextShows = movieShows.filter((item) => item.cinemaId === cinemaId);
    const nextShow = nextShows[0] ?? fallbackShow;
    setSelectedCinemaId(cinemaId);
    setSelectedDate(nextShow.date);
    setSelectedShowId(nextShow.id);
    setSelected([]);
  }

  function selectDate(date: string) {
    const nextShow = cinemaShows.find((item) => item.date === date) ?? cinemaShows[0] ?? fallbackShow;
    setSelectedDate(date);
    setSelectedShowId(nextShow.id);
    setSelected([]);
  }

  function selectShow(show: Show) {
    setSelectedShowId(show.id);
    setSelected([]);
  }

  function toggle(seat: Seat) {
    setSelected((value) => (value.includes(seat.id) ? value.filter((id) => id !== seat.id) : [...value, seat.id]));
  }

  return (
    <div className="mx-auto max-w-6xl py-4 md:py-6">
      <section className="relative mb-5 overflow-hidden rounded-[34px] border border-ember/25 bg-black p-4 shadow-glow md:p-6">
        <img src={movie.banner} alt={`${movie.title} booking banner`} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/25 md:bg-gradient-to-r" />
        <div className="film-grain opacity-20" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ember">
              <Sparkles size={14} /> Animated booking studio
            </p>
            <h1 className="mt-2 truncate text-3xl font-black tracking-[-0.04em] md:text-5xl">{movie.title}</h1>
            <p className="mt-2 text-sm leading-6 text-muted md:max-w-2xl">Choose theater, load showtimes, pick a time, then enter the animated film hall to select seats.</p>
          </div>
          <Link to={`/movies/${movie.id}`} className="mobile-hit-target grid shrink-0 place-items-center rounded-full bg-white/10 backdrop-blur-xl">
            <Heart size={20} />
          </Link>
        </div>
      </section>

      <BookingStepper activeStep={activeStep} />

      <div className="mt-5 grid gap-5 lg:grid-cols-[410px_1fr]">
        <aside className="space-y-4">
          <BookingPanel icon={Building2} eyebrow="Step 01" title="Load theaters">
            <div className="space-y-3">
              {cinemas.map((cinema, index) => {
                const hasShows = movieShows.some((show) => show.cinemaId === cinema.id);
                const active = selectedCinemaId === cinema.id;
                return (
                  <motion.button
                    key={cinema.id}
                    type="button"
                    disabled={!hasShows}
                    onClick={() => selectCinema(cinema.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-full rounded-3xl border p-4 text-left transition ${
                      active ? 'border-ember bg-ember/15 shadow-glow' : 'border-white/10 bg-white/[0.04] hover:border-ember/30'
                    } ${!hasShows ? 'opacity-35' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{cinema.name}</h3>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={13} /> {cinema.distance} • {cinema.address}</p>
                        <p className="mt-2 text-xs text-ember">★ {cinema.rating} {cinema.premium ? '• Premium hall' : ''}</p>
                      </div>
                      {active ? <Check className="text-ember" /> : <ChevronRight className="text-muted" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </BookingPanel>

          <BookingPanel icon={CalendarDays} eyebrow="Step 02" title="Load show dates">
            <div className="cinema-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {availableDates.map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => selectDate(date)}
                  className={`mobile-hit-target shrink-0 rounded-2xl px-4 py-3 text-sm font-semibold ${selectedDate === date ? 'bg-ember-gradient shadow-glow' : 'bg-white/5 text-muted'}`}
                >
                  {shortDate(date)}
                </button>
              ))}
            </div>
          </BookingPanel>

          <BookingPanel icon={Clock3} eyebrow="Step 03" title="Select time">
            <div className="grid grid-cols-2 gap-2">
              {dateShows.map((show) => (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  key={show.id}
                  type="button"
                  onClick={() => selectShow(show)}
                  className={`rounded-2xl border p-3 text-left ${selectedShowId === show.id ? 'border-ember bg-ember/15' : 'border-white/10 bg-white/5'}`}
                >
                  <p className="font-bold">{show.time}</p>
                  <p className="text-xs text-muted">{show.hall}</p>
                  <p className="mt-2 text-xs text-ember">{show.occupancy}% full • {money(show.basePrice)}</p>
                </motion.button>
              ))}
            </div>
          </BookingPanel>
        </aside>

        <section className="space-y-4">
          <ReactFilmHall show={selectedShow} cinemaName={selectedCinema.name} selectedCount={selected.length} />
          <BookingPanel icon={Sparkles} eyebrow="Step 04" title="Select seats">
            <SeatMap seats={seats} selected={selected} onToggle={toggle} />
          </BookingPanel>

          <motion.div layout className="glass sticky bottom-28 z-20 flex items-center justify-between gap-4 rounded-[28px] p-4 md:static md:p-5">
            <div className="min-w-0">
              <p className="text-sm text-muted">{selectedShow.hall} • {selectedCinema.name}</p>
              <h2 className="truncate text-xl font-bold">{selected.join(', ') || 'Choose seats'}</h2>
              <p className="text-sm text-muted">{selected.length} Tickets • {selectedShow.time}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted">Total Price</p>
              <b className="text-2xl text-ember">{money(total)}</b>
            </div>
          </motion.div>

          <Link to="/checkout" className="mobile-hit-target block rounded-2xl bg-ember-gradient px-6 py-4 text-center font-bold shadow-glow">
            Continue to Checkout
          </Link>
          <p className="flex items-center justify-center gap-2 text-xs text-muted">
            <ShieldCheck size={14} className="text-ember" /> Real-time locks release if checkout times out
          </p>
        </section>
      </div>
    </div>
  );
}

function BookingStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="glass rounded-[28px] p-3">
      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <div key={step} className="relative overflow-hidden rounded-2xl bg-white/[0.04] p-3 text-center">
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1 bg-ember"
              initial={false}
              animate={{ scaleX: index <= activeStep ? 1 : 0 }}
              style={{ transformOrigin: 'left' }}
            />
            <p className={`text-[10px] uppercase tracking-[0.16em] ${index <= activeStep ? 'text-ember' : 'text-muted'}`}>0{index + 1}</p>
            <p className="mt-1 text-xs font-bold md:text-sm">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingPanel({ icon: Icon, eyebrow, title, children }: { icon: LucideIcon; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="glass rounded-[30px] p-4 md:p-5"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ember/15 text-ember">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ember">{eyebrow}</p>
          <h2 className="text-lg font-black">{title}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function ReactFilmHall({ show, cinemaName, selectedCount }: { show: Show; cinemaName: string; selectedCount: number }) {
  return (
    <section className="film-hall-stage relative overflow-hidden rounded-[34px] border border-ember/25 bg-black p-5 shadow-glow">
      <div className="film-grain opacity-20" />
      <div className="hall-screen-glow mx-auto mb-5 h-16 max-w-lg rounded-t-full border-t-2 border-ember" />
      <div className="relative text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-ember">React Film Hall</p>
        <h2 className="mt-2 text-2xl font-black md:text-4xl">{show.hall}</h2>
        <p className="mt-2 text-sm text-muted">{cinemaName} • {shortDate(show.date)} • {show.time}</p>
      </div>
      <div className="relative mx-auto mt-6 grid max-w-xl gap-2 perspective-hall">
        {['VIP Balcony', 'Premium Row', 'Standard Row', 'Front Glow'].map((row, index) => (
          <motion.div
            key={row}
            className="hall-row flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-muted"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="w-24 text-left">{row}</span>
            {Array.from({ length: 10 }).map((_, seatIndex) => (
              <i
                key={`${row}-${seatIndex}`}
                className={`h-3 w-3 rounded ${seatIndex < selectedCount ? 'bg-ember shadow-glow' : 'bg-white/20'}`}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
