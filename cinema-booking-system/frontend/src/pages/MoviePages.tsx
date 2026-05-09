import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { CalendarDays, ChevronRight, Clock3, Heart, Languages, MapPin, Play, Search, ShieldCheck, Sparkles, Star, Ticket } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { cinemas, movies, shows } from '../data';
import { money, shortDate } from '../utils/format';

export function MoviesPage() {
  const [q, setQ] = useState('');
  const [tab, setTab] = useState<'NOW_SHOWING' | 'COMING_SOON'>('NOW_SHOWING');
  const filtered = movies.filter(
    (movie) => movie.status === tab && `${movie.title} ${movie.genre} ${movie.language}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="py-6 md:py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-ember">Movies</p>
          <h1 className="text-3xl font-black tracking-[-0.04em] md:text-4xl">Find your next big-screen escape</h1>
        </div>
        <label className="glass flex items-center gap-3 rounded-2xl px-4 py-3 md:w-96">
          <Search className="text-muted" />
          <input value={q} onChange={(event) => setQ(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" placeholder="Search movies, heroes, theaters..." />
        </label>
      </div>
      <div className="cinema-scroll my-6 flex gap-3 overflow-x-auto pb-1">
        {(['NOW_SHOWING', 'COMING_SOON'] as const).map((status) => (
          <button
            type="button"
            onClick={() => setTab(status)}
            className={`mobile-hit-target shrink-0 rounded-2xl px-5 py-3 ${tab === status ? 'bg-ember-gradient' : 'glass text-muted'}`}
            key={status}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {filtered.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export function MovieDetailsPage() {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === id) ?? movies[0];
  const available = shows.filter((show) => show.movieId === movie.id);
  const recommended = movies.filter((item) => item.id !== movie.id).slice(0, 4);

  return (
    <div className="space-y-6 py-4 md:py-6">
      <section className="movie-detail-hero relative overflow-hidden rounded-[34px] border border-ember/25 bg-black shadow-glow md:rounded-[44px]">
        <img src={movie.banner} alt={`${movie.title} animated background`} className="absolute inset-0 h-full w-full scale-105 object-cover opacity-45" />
        <div className="animated-video-backdrop" />
        <div className="film-grain opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/82 to-black/20 md:bg-gradient-to-r" />
        <div className="relative p-5 md:p-10">
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-ember">Home</Link>
            <ChevronRight size={14} />
            <Link to="/movies" className="hover:text-ember">Movies</Link>
            <ChevronRight size={14} />
            <span className="text-ember">{movie.title}</span>
          </nav>

          <div className="grid gap-6 md:grid-cols-[280px_1fr] md:items-end">
            <motion.div initial={{ opacity: 0, rotate: -4, y: 20 }} animate={{ opacity: 1, rotate: -1, y: 0 }} className="hero-poster-card glass mx-auto w-52 rounded-[30px] p-3 md:mx-0 md:w-full">
              <img src={movie.poster} alt={movie.title} className="aspect-[3/4] w-full rounded-[22px] object-cover" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-ember/30 bg-ember/15 px-4 py-2 text-xs font-bold text-ember">{movie.status.replace('_', ' ')}</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold">{movie.ageRating}</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold"><Languages className="mr-1 inline" size={13} /> {movie.language}</span>
              </div>
              <h1 className="mt-4 text-4xl font-black leading-none tracking-[-0.05em] md:text-7xl">{movie.title}</h1>
              <p className="mt-3 text-sm text-muted md:text-base">{movie.genre} • {movie.duration}</p>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/78 md:text-base md:leading-8">{movie.synopsis}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 md:flex md:flex-wrap">
                <Link to={`/booking/${movie.id}`} className="mobile-hit-target rounded-2xl bg-ember-gradient px-5 py-4 text-center font-black shadow-glow">
                  <Ticket className="mr-2 inline" size={18} /> Book Now
                </Link>
                <button type="button" className="mobile-hit-target rounded-2xl border border-ember/30 bg-black/40 px-5 py-4 font-bold text-ember backdrop-blur-xl">
                  <Play className="mr-2 inline" size={18} /> Trailer
                </button>
                <button type="button" className="mobile-hit-target col-span-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 font-bold md:col-span-1">
                  <Heart className="mr-2 inline" size={18} /> Watchlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass rounded-[32px] p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ember">Available theaters</p>
              <h2 className="text-2xl font-black">Pick a showtime</h2>
            </div>
            <Sparkles className="text-ember" />
          </div>
          <div className="grid gap-3">
            {available.map((show, index) => {
              const cinema = cinemas.find((item) => item.id === show.cinemaId)!;
              return (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-[26px] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="font-black">{cinema.name}</h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted"><MapPin size={14} className="text-ember" /> {cinema.address}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                        <span className="rounded-full bg-white/5 px-3 py-1"><CalendarDays className="mr-1 inline" size={13} /> {shortDate(show.date)}</span>
                        <span className="rounded-full bg-white/5 px-3 py-1"><Clock3 className="mr-1 inline" size={13} /> {show.time}</span>
                        <span className="rounded-full bg-white/5 px-3 py-1">{show.hall}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                      <p className="text-sm text-muted">From</p>
                      <p className="text-xl font-black text-ember">{money(show.basePrice)}</p>
                      <Link to={`/booking/${movie.id}`} className="mt-0 inline-flex rounded-2xl bg-ember-gradient px-4 py-3 text-sm font-black shadow-glow sm:mt-3">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="glass rounded-[32px] p-5 md:p-6">
            <h3 className="font-black">Film details</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Info label="Rating" value={movie.rating ? `${movie.rating}/10` : 'Coming soon'} />
              <Info label="Duration" value={movie.duration} />
              <Info label="Language" value={movie.language} />
              <Info label="Status" value={movie.status.replace('_', ' ')} />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted"><ShieldCheck size={16} className="text-ember" /> Secure checkout with real-time seat locks.</p>
          </section>

          <section className="glass rounded-[32px] p-5 md:p-6">
            <h3 className="font-black">Cast & crew</h3>
            <div className="mt-4 space-y-3">
              {movie.cast.map((cast) => (
                <div className="flex items-center gap-3" key={cast}>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-ember/20 text-xs font-black text-ember">{cast.slice(0, 1)}</div>
                  <span>{cast}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-ember"><Star className="fill-ember" /> {movie.rating || 'Coming soon'}</div>
          </section>
        </aside>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-black">More cinematic picks</h2>
          <Link to="/movies" className="text-sm text-ember">View all</Link>
        </div>
        <div className="featured-movie-rail cinema-scroll">
          {recommended.map((item) => (
            <div key={item.id} className="featured-movie-card">
              <MovieCard movie={item} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}
