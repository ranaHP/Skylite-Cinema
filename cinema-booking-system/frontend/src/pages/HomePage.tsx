import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Popcorn, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { cinemas, food, movies } from '../data';

export function HomePage() {
  return (
    <div className="space-y-9 pt-4 md:space-y-12 md:pt-6">
      <section className="relative -mx-1 overflow-hidden rounded-[32px] border border-ember/25 bg-black shadow-glow md:mx-0 md:rounded-[40px]">
        <img src={movies[0].banner} alt="Dune cinematic banner" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 md:bg-gradient-to-r" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative grid min-h-[72dvh] items-end gap-6 p-5 sm:min-h-[680px] md:grid-cols-[1fr_360px] md:p-12"
        >
          <div className="max-w-3xl">
            <span className="rounded-full border border-ember/30 bg-ember/10 px-3 py-2 text-xs text-ember md:px-4 md:text-sm">
              Premium cinematic booking experience
            </span>
            <h1 className="mt-5 text-[2.35rem] font-extrabold leading-[1.03] tracking-[-0.04em] md:mt-6 md:text-6xl">
              Book the perfect seat for <span className="ember-text">Movie Hub</span> nights.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted md:text-lg md:leading-8">
              Browse showtimes, lock seats in realtime, add gourmet snacks, and receive a premium QR ticket in seconds.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:flex md:flex-wrap">
              <Link
                to="/booking/dune-2"
                className="mobile-hit-target rounded-2xl bg-ember-gradient px-4 py-4 text-center text-sm font-semibold shadow-glow md:px-6 md:text-base"
              >
                Book Tickets
              </Link>
              <Link
                to="/movies/dune-2"
                className="mobile-hit-target rounded-2xl border border-ember/30 px-4 py-4 text-center text-sm font-semibold text-ember md:px-6 md:text-base"
              >
                View Details
              </Link>
            </div>
          </div>

          <div className="glass hidden rounded-[32px] p-4 md:block">
            <img src={movies[0].poster} alt={movies[0].title} className="h-80 w-full rounded-[24px] object-cover" />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted">Now Showing</p>
                <h3 className="text-2xl font-bold">{movies[0].title}</h3>
              </div>
              <span className="rounded-2xl bg-ember/15 px-3 py-2 text-ember">★ 8.8</span>
            </div>
          </div>
        </motion.div>
      </section>

      <Section title="Featured movies" action="Explore all">
        <div className="mobile-poster-rail cinema-scroll md:grid md:grid-cols-4 md:gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="mobile-card-snap">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Cinema locations" action="Find near me">
        <div className="cinema-scroll flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {cinemas.map((cinema) => (
            <div key={cinema.id} className="glass mobile-card-snap min-w-[82%] rounded-[28px] p-5 md:min-w-0">
              <MapPin className="text-ember" />
              <h3 className="mt-3 font-bold">{cinema.name}</h3>
              <p className="text-sm text-muted">{cinema.address}</p>
              <p className="mt-3 text-sm text-ember">
                {cinema.distance} • ★ {cinema.rating}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="glass grid gap-6 rounded-[32px] p-5 md:grid-cols-2 md:rounded-[36px] md:p-8">
        <div>
          <Popcorn className="text-ember" size={34} />
          <h2 className="mt-4 text-2xl font-bold leading-tight md:text-3xl">Food & drinks before the credits roll.</h2>
          <p className="mt-3 text-sm leading-6 text-muted md:text-base">
            Bundle combos during checkout or add food later from your ticket QR.
          </p>
        </div>
        <div className="grid gap-3">
          {food.map((item) => (
            <div className="flex items-center gap-3 rounded-3xl bg-white/5 p-3" key={item.id}>
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="text-sm text-muted">{item.category}</p>
              </div>
              <b className="text-ember">${item.price}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-ember/25 bg-ember-gradient p-6 text-center md:rounded-[36px] md:p-8">
        <Sparkles className="mx-auto" />
        <h2 className="mt-3 text-2xl font-bold md:text-3xl">Unlock members-only premieres</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/80 md:text-base">
          Subscribe for reminders, offers, loyalty food bundles, and early seat access.
        </p>
        <div className="mx-auto mt-5 flex max-w-md gap-2 rounded-2xl bg-black/40 p-2">
          <input className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" placeholder="you@example.com" />
          <button type="button" className="mobile-hit-target rounded-xl bg-black px-4 py-3">
            <ArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
}

function Section({ title, action, children }: { title: string; action: string; children: ReactNode }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between md:mb-5">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <button type="button" className="mobile-hit-target rounded-full px-2 text-sm text-ember">
          {action}
        </button>
      </div>
      {children}
    </section>
  );
}
