import { Link } from 'react-router-dom';
import { Bookmark, ChevronRight, Film, Grid2X2, Home, Star, Target, Ticket } from 'lucide-react';
import { movies } from '../data';

export function HomePage() {
  const featured = movies[0];
  const nowShowing = movies.slice(1, 4);
  const shortcuts = [
    { label: 'Now Showing', icon: Grid2X2, active: true },
    { label: 'Coming Soon', icon: Bookmark },
    { label: 'Top Rated', icon: Star },
    { label: 'Action', icon: Target },
    { label: 'Action', icon: Film },
  ];

  return (
    <div className="mh-screen space-y-4 pb-2 pt-2">
      <Link to={`/movies/${featured.id}`} className="relative block h-[184px] overflow-hidden rounded-xl bg-black">
        <img src={featured.banner} alt={featured.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/38 to-transparent" />
        <div className="absolute left-4 top-9">
          <p className="text-3xl font-light tracking-[.34em]">DUNE</p>
          <p className="-mt-1 text-[10px] uppercase tracking-[.72em] text-ember">Part Two</p>
          <p className="mt-2 text-xs leading-5 text-white/90">Sci-Fi, Adventure<br />2h 46m • 2024</p>
          <span className="mt-2 inline-block rounded-md bg-[linear-gradient(180deg,#c4610b,#713000)] px-5 py-2 text-xs font-bold">Book Now</span>
        </div>
      </Link>

      <div className="grid grid-cols-5 gap-2">
        {shortcuts.map(({ label, icon: Icon, active }) => (
          <button key={label} type="button" className="text-center">
            <span className={`mx-auto grid h-12 w-12 place-items-center rounded-xl ${active ? 'bg-[linear-gradient(180deg,#c4610b,#713000)]' : 'bg-[#1b1b1b]'} text-white`}><Icon size={18} /></span>
            <span className="mt-2 block truncate text-[10px] text-white">{label}</span>
          </button>
        ))}
      </div>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-medium text-ember">Now Showing</h2>
          <Link to="/movies" className="flex items-center gap-1 text-xs text-white">See All <ChevronRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {nowShowing.map((movie) => <SmallMovie key={movie.id} movie={movie} />)}
        </div>
      </section>

      <Link to="/booking/dune-2" className="mh-card flex items-center gap-4 rounded-2xl border-ember/70 p-3">
        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=220&q=80" alt="cinema" className="h-20 w-28 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-tight">Enjoy Your Movie To The Fullest</h3>
          <p className="mt-1 text-xs leading-5 text-[#b3b3b3]">Book tickets for an easy and quick experience.</p>
        </div>
        <ChevronRight />
      </Link>
    </div>
  );
}

function SmallMovie({ movie }: { movie: typeof movies[number] }) {
  return (
    <Link to={`/movies/${movie.id}`} className="mh-card relative overflow-hidden rounded-xl">
      <div className="relative h-[142px]">
        <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
        <Bookmark className="absolute right-2 top-2 text-white" size={15} />
        <p className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px]"><Star size={11} fill="#f6b338" className="text-[#f6b338]" /> {movie.rating}</p>
      </div>
      <div className="p-2">
        <h3 className="line-clamp-2 min-h-[30px] text-xs font-bold">{movie.title}</h3>
        <p className="truncate text-[9px] text-[#b3b3b3]">{movie.duration} • {movie.genre}</p>
      </div>
    </Link>
  );
}
