import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/domain';

export function MovieCard({ movie, featured = false }: { movie: Movie; featured?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`glass overflow-hidden rounded-[24px] md:rounded-[28px] ${featured ? 'md:col-span-2' : ''}`}
    >
      <Link to={`/movies/${movie.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover poster-mask transition duration-500 hover:scale-110"
          />
          <div className="absolute left-2 top-2 rounded-full bg-black/65 px-2.5 py-1 text-[10px] text-ember md:left-3 md:top-3 md:text-xs">
            {movie.status.replace('_', ' ')}
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="line-clamp-2 text-base font-bold md:text-lg">{movie.title}</h3>
            <p className="line-clamp-1 text-xs text-muted md:text-sm">{movie.genre}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <Star size={15} className="fill-ember text-ember" />
              <span className="font-semibold">{movie.rating || 'Soon'}</span>
              <span className="truncate text-xs text-muted">• {movie.duration}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
