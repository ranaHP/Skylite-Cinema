import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Popcorn, Sparkles } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { AnimatedFilmStrip, CinematicHero, ScrollCinematicStory } from '../components/CinematicShowcase';
import { cinemas, food, movies } from '../data';

export function HomePage() {
  return (
    <div className="space-y-9 pt-4 md:space-y-12 md:pt-6">
      <CinematicHero movie={movies[0]} />
      <AnimatedFilmStrip movies={movies} />

      <Section title="Featured movies" action="Explore all">
        <div className="mobile-poster-rail cinema-scroll md:grid md:grid-cols-4 md:gap-4">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              className="mobile-card-snap"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </Section>

      <ScrollCinematicStory movies={movies} />

      <Section title="Cinema locations" action="Find near me">
        <div className="cinema-scroll flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {cinemas.map((cinema, index) => (
            <motion.div
              key={cinema.id}
              className="glass mobile-card-snap min-w-[82%] rounded-[28px] p-5 md:min-w-0"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <MapPin className="text-ember" />
              <h3 className="mt-3 font-bold">{cinema.name}</h3>
              <p className="text-sm text-muted">{cinema.address}</p>
              <p className="mt-3 text-sm text-ember">
                {cinema.distance} • ★ {cinema.rating}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="glass relative grid gap-6 overflow-hidden rounded-[32px] p-5 md:grid-cols-2 md:rounded-[36px] md:p-8"
      >
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-ember/20 blur-3xl" />
        <div className="relative">
          <Popcorn className="text-ember" size={34} />
          <h2 className="mt-4 text-2xl font-bold leading-tight md:text-3xl">Food & drinks before the credits roll.</h2>
          <p className="mt-3 text-sm leading-6 text-muted md:text-base">
            Bundle combos during checkout or add food later from your ticket QR.
          </p>
        </div>
        <div className="relative grid gap-3">
          {food.map((item, index) => (
            <motion.div
              className="flex items-center gap-3 rounded-3xl bg-white/5 p-3"
              key={item.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{item.name}</p>
                <p className="text-sm text-muted">{item.category}</p>
              </div>
              <b className="text-ember">${item.price}</b>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-[32px] border border-ember/25 bg-ember-gradient p-6 text-center md:rounded-[36px] md:p-8"
      >
        <div className="film-grain opacity-30" />
        <Sparkles className="relative mx-auto" />
        <h2 className="relative mt-3 text-2xl font-bold md:text-3xl">Unlock members-only premieres</h2>
        <p className="relative mx-auto mt-2 max-w-xl text-sm text-white/80 md:text-base">
          Subscribe for reminders, offers, loyalty food bundles, and early seat access.
        </p>
        <div className="relative mx-auto mt-5 flex max-w-md gap-2 rounded-2xl bg-black/40 p-2">
          <input className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" placeholder="you@example.com" />
          <button type="button" className="mobile-hit-target rounded-xl bg-black px-4 py-3">
            <ArrowRight />
          </button>
        </div>
      </motion.section>
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
