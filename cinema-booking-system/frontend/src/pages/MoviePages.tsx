import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, ChevronRight, Search, SlidersHorizontal, Star } from 'lucide-react';
import { movies } from '../data';

export function MoviesPage() {
  return (
    <div className="mh-screen pb-2 pt-4">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-base font-semibold">Movie</h1>
        <div className="flex gap-3 text-white"><SlidersHorizontal size={20} /><span className="relative"><SlidersHorizontal size={20} /><i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-ember" /></span></div>
      </div>
      <label className="mh-search mb-3 flex h-10 items-center gap-2 rounded-lg px-3 text-sm"><Search size={17} /> Search Movies, Theaters...<SlidersHorizontal className="ml-auto text-white" size={18} /></label>
      <div className="cinema-scroll mb-5 flex gap-2 overflow-x-auto pb-1">
        {['Now Showing', 'Popular', 'Top Rated', 'Action'].map((tab, index) => <span key={tab} className={`mh-chip shrink-0 ${index === 0 ? 'mh-chip-active' : ''}`}>{tab}</span>)}
      </div>
      <div className="grid grid-cols-2 gap-5">
        {movies.slice(4, 8).concat(movies.slice(0, 2)).map((movie) => <MovieTile key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

function MovieTile({ movie }: { movie: typeof movies[number] }) {
  return (
    <Link to={`/movies/${movie.id}`} className="mh-card overflow-hidden rounded-xl">
      <div className="relative h-[172px]">
        <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
        <Bookmark className="absolute right-2 top-2 text-white" size={17} />
        <p className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px]"><Star size={11} fill="#f6b338" className="text-[#f6b338]" /> {movie.rating}</p>
      </div>
      <div className="bg-[#171717] p-2">
        <h3 className="truncate text-xs font-bold">{movie.title}</h3>
        <p className="mt-1 truncate text-[10px] text-[#b3b3b3]">★ {movie.rating} &nbsp; {movie.genre}</p>
      </div>
    </Link>
  );
}

export function MovieDetailsPage() {
  const { id } = useParams();
  const movie = movies.find((item) => item.id === id) ?? movies[0];
  const cast = [
    ['Timothée Chalamet', 'Paul Atreides', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80'],
    ['Zendaya', 'Chani', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=160&q=80'],
    ['Rebecca Ferguson', 'Lady Jessica', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80'],
  ];

  return (
    <div className="mh-screen -mx-3 -mt-0 pb-5">
      <section className="relative h-[470px] overflow-hidden">
        <img src={movie.banner} alt={movie.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-black/10" />
        <Link to="/movies" className="absolute left-4 top-5 z-10"><ArrowLeft size={22} /></Link>
        <div className="absolute inset-x-0 bottom-0 px-5 pb-3">
          <h1 className="text-2xl font-semibold">{movie.title}</h1>
          <div className="mt-2 flex items-center gap-3 text-xs text-[#d6d6d6]"><span className="flex items-center gap-1"><Star size={13} fill="#f6b338" className="text-[#f6b338]" /> {movie.rating}</span><span>2024</span><span>Sci-Fi, Adventure, Drama</span><span className="rounded bg-[#2a2a2a] px-2 py-1 text-[10px]">PG-13</span></div>
        </div>
      </section>
      <main className="space-y-5 px-5">
        <section><h2 className="mb-2 text-lg font-semibold">Overview</h2><p className="text-sm leading-6 text-[#b3b3b3]">{movie.synopsis}</p></section>
        <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold">Cast</h2><button className="flex items-center gap-1 text-sm text-ember">View All <ChevronRight size={14} /></button></div>
          <div className="cinema-scroll flex gap-4 overflow-x-auto pb-2">{cast.map(([name, role, img]) => <div key={name} className="w-24 shrink-0"><img src={img} alt={name} className="h-24 w-24 rounded-lg object-cover" /><p className="mt-2 truncate text-xs font-bold">{name}</p><p className="truncate text-[11px] text-[#b3b3b3]">{role}</p></div>)}</div>
        </section>
        <Link to={`/booking/${movie.id}`} className="mh-button block py-4 text-center">Book Tickets</Link>
      </main>
    </div>
  );
}
