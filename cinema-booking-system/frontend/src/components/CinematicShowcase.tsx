import { motion, useScroll, useTransform } from 'framer-motion';
import { Clapperboard, PlayCircle, Radio, Sparkles, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/domain';

export function CinematicHero({ movie }: { movie: Movie }) {
  return (
    <section className="cinematic-hero relative -mx-1 overflow-hidden rounded-[34px] border border-ember/25 bg-black shadow-glow md:mx-0 md:rounded-[44px]">
      <div className="absolute inset-0">
        <img src={movie.banner} alt={`${movie.title} banner`} className="h-full w-full scale-105 object-cover opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(255,122,0,.34),transparent_28%),linear-gradient(0deg,#000_0%,rgba(0,0,0,.78)_34%,rgba(0,0,0,.28)_100%)] md:bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,.84)_45%,rgba(0,0,0,.2)_100%)]" />
      </div>
      <div className="film-grain" />
      <div className="projector-beam projector-beam-a" />
      <div className="projector-beam projector-beam-b" />
      <div className="cinema-light-orb left-[12%] top-[18%]" />
      <div className="cinema-light-orb right-[14%] top-[12%] animation-delay-700" />

      <motion.div
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative grid min-h-[76dvh] items-end gap-6 p-5 sm:min-h-[700px] md:grid-cols-[1fr_390px] md:p-12"
      >
        <div className="max-w-3xl pb-2 md:pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-black/45 px-3 py-2 text-xs text-ember backdrop-blur-xl md:px-4 md:text-sm">
            <Radio size={15} className="animate-pulse" /> Live premieres • Seat locking • QR tickets
          </div>
          <h1 className="mt-5 text-[2.65rem] font-black leading-[0.98] tracking-[-0.055em] md:mt-7 md:text-7xl">
            Your next <span className="ember-text">cinematic</span> ritual starts here.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/76 md:text-lg md:leading-8">
            Swipe through premium film banners, reserve the exact seats you love, add amber-lit snacks, and walk in with a glowing QR ticket.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:flex md:flex-wrap">
            <Link
              to={`/booking/${movie.id}`}
              className="mobile-hit-target rounded-2xl bg-ember-gradient px-4 py-4 text-center text-sm font-bold shadow-glow transition hover:scale-[1.02] md:px-6 md:text-base"
            >
              <Ticket className="mr-2 inline" size={18} /> Book Tickets
            </Link>
            <Link
              to={`/movies/${movie.id}`}
              className="mobile-hit-target rounded-2xl border border-ember/35 bg-black/35 px-4 py-4 text-center text-sm font-bold text-ember backdrop-blur-xl transition hover:bg-ember/10 md:px-6 md:text-base"
            >
              <PlayCircle className="mr-2 inline" size={18} /> Watch Trailer
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 text-center md:max-w-lg">
            <HeroStat value={movie.rating.toFixed(1)} label="Audience" />
            <HeroStat value="IMAX" label="Premium" />
            <HeroStat value="8:30" label="Tonight" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: 4, y: 30 }}
          animate={{ opacity: 1, rotate: -2, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="hero-poster-card glass hidden rounded-[34px] p-4 md:block"
        >
          <div className="relative overflow-hidden rounded-[26px]">
            <img src={movie.poster} alt={movie.title} className="h-[430px] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-ember">Now Showing</p>
              <h3 className="mt-2 text-3xl font-black">{movie.title}</h3>
              <p className="mt-1 text-sm text-muted">{movie.genre} • {movie.duration}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function AnimatedFilmStrip({ movies }: { movies: Movie[] }) {
  const strip = [...movies, ...movies, ...movies];
  return (
    <section className="relative -mx-4 overflow-hidden border-y border-ember/20 bg-black/45 py-5 md:mx-0 md:rounded-[32px] md:border">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,.13),transparent_38%)]" />
      <div className="film-strip-track relative flex w-max gap-4">
        {strip.map((movie, index) => (
          <Link
            to={`/movies/${movie.id}`}
            key={`${movie.id}-${index}`}
            className="group flex w-64 shrink-0 items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl transition hover:border-ember/40 hover:bg-ember/10"
          >
            <img src={movie.poster} alt={movie.title} className="h-24 w-16 rounded-2xl object-cover" />
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-ember">
                <Clapperboard size={13} /> Film reel
              </p>
              <h3 className="mt-1 truncate font-bold">{movie.title}</h3>
              <p className="truncate text-xs text-muted">{movie.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ScrollCinematicStory({ movies }: { movies: Movie[] }) {
  const { scrollYProgress } = useScroll();
  const glowX = useTransform(scrollYProgress, [0, 1], ['-15%', '18%']);

  return (
    <section className="relative overflow-hidden rounded-[34px] border border-ember/20 bg-[#050505] p-5 md:rounded-[42px] md:p-8">
      <motion.div style={{ x: glowX }} className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-ember/20 blur-3xl" />
      <div className="relative mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-ember">
            <Sparkles size={16} /> Scroll animated cinema content
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] md:text-5xl">Stories that move as you scroll.</h2>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-muted md:block">
          Each card reveals a different part of the night: trailer, seat lock, snacks, and QR entry.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {movies.map((movie, index) => (
          <motion.article
            key={movie.id}
            initial={{ opacity: 0, y: 46, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
            className="group relative min-h-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-black shadow-card"
          >
            <img src={movie.banner} alt={`${movie.title} scene`} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/66 to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-ember/30 bg-black/45 px-3 py-1 text-xs text-ember backdrop-blur-xl">
              Chapter 0{index + 1}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-ember">{movie.status.replace('_', ' ')}</p>
              <h3 className="mt-2 text-2xl font-black">{movie.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/72">{movie.synopsis}</p>
              <Link to={`/movies/${movie.id}`} className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white">
                Explore film <PlayCircle size={16} className="text-ember" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
      <b className="block text-lg text-white md:text-2xl">{value}</b>
      <span className="text-[10px] uppercase tracking-[0.18em] text-muted">{label}</span>
    </div>
  );
}
