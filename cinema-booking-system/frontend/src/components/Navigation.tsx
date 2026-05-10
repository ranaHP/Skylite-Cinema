import { Link, NavLink, useLocation } from 'react-router-dom';
import { BarChart3, Bell, CalendarPlus, ClipboardCheck, Film, FileText, Home, MapPin, Palette, Search, Settings, SlidersHorizontal, Ticket, UploadCloud, UserRound } from 'lucide-react';

const customer = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/movies', label: 'Movies', icon: Film },
  { to: '/cinemas', label: 'Theaters', icon: MapPin },
  { to: '/tickets', label: 'Tickets', icon: Ticket },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

const admin = [
  { to: '/admin', label: 'Dashboard', icon: BarChart3 },
  { to: '/admin/movies', label: 'Movies', icon: Film },
  { to: '/admin/shows', label: 'Shows', icon: CalendarPlus },
  { to: '/admin/bookings', label: 'Bookings', icon: ClipboardCheck },
  { to: '/admin/customers', label: 'Customers', icon: UserRound },
  { to: '/admin/content', label: 'Content', icon: FileText },
  { to: '/admin/files', label: 'Files', icon: UploadCloud },
  { to: '/admin/design-system', label: 'Design System', icon: Palette },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function TopNav() {
  const { pathname } = useLocation();
  if (pathname !== '/') return null;

  return (
    <header className="sticky top-0 z-40 bg-[#050505]/95 px-3 pb-2 pt-3 backdrop-blur-xl md:hidden">
      <div className="mb-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[linear-gradient(135deg,#b85b08,#5f2900)] text-[13px]">✤</span>
          <span className="text-sm font-semibold">Movie Hub</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="relative"><Bell size={18} /><i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-ember" /></span>
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="profile" className="h-8 w-8 rounded-full border border-ember/60 object-cover" />
        </div>
      </div>
      <Link to="/movies" className="flex h-10 items-center gap-2 rounded-lg border border-[#b3b3b3]/80 bg-[#121212] px-3 text-sm text-[#b3b3b3] shadow-[0_0_0_1px_rgba(255,255,255,.04)]">
        <Search size={17} /> Search Movies, Theaters...
        <SlidersHorizontal className="ml-auto text-white" size={18} />
      </Link>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#050505]/98 px-2 pb-[max(.55rem,var(--safe-bottom))] pt-2 backdrop-blur-2xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {customer.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex h-11 flex-col items-center justify-center gap-1 text-[10px] transition ${isActive ? 'text-ember' : 'text-[#b3b3b3]'}`}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function AdminSidebar() {
  return (
    <aside className="glass cinema-scroll sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 overflow-y-auto rounded-[32px] p-4 lg:block">
      <Link to="/" className="mb-8 block px-3 text-2xl font-extrabold">SkyLite <span className="ember-text">Cinema</span></Link>
      <nav className="space-y-2">
        {admin.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} end={to === '/admin'} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 ${isActive ? 'bg-ember-gradient text-white shadow-glow' : 'text-muted hover:bg-white/5 hover:text-white'}`}>
            <Icon size={20} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
