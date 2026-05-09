import { Link, NavLink } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Film,
  Home,
  MapPin,
  Menu,
  Search,
  Settings,
  Ticket,
  UserRound,
  FileText,
  UploadCloud,
  CalendarPlus,
  ClipboardCheck,
  Palette,
} from 'lucide-react';

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
  return (
    <header className="mobile-sticky-header sticky top-0 z-40 border-b border-white/5 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <Link to="/" className="text-lg font-extrabold tracking-tight md:text-xl">
          SkyLite <span className="ember-text">Cinema</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/movies"
            aria-label="Search movies"
            className="mobile-hit-target grid place-items-center rounded-2xl bg-white/5 text-muted"
          >
            <Search size={19} />
          </Link>
          <Link
            to="/profile"
            aria-label="Notifications"
            className="mobile-hit-target relative grid place-items-center rounded-2xl bg-white/5 text-muted"
          >
            <Bell size={19} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-ember" />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="mobile-hit-target grid place-items-center rounded-2xl bg-white/5 text-muted"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {customer.slice(0, 4).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-ember' : 'text-muted hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/admin" className="rounded-full border border-ember/30 px-4 py-2 text-sm text-ember">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/90 px-3 pt-2 backdrop-blur-2xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-1 shadow-glow">
        {customer.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `mobile-hit-target flex flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-medium transition ${
                isActive ? 'bg-ember/15 text-ember' : 'text-muted'
              }`
            }
          >
            <Icon size={19} />
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
      <Link to="/" className="mb-8 block px-3 text-2xl font-extrabold">
        SkyLite <span className="ember-text">Cinema</span>
      </Link>
      <nav className="space-y-2">
        {admin.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            end={to === '/admin'}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 ${
                isActive ? 'bg-ember-gradient text-white shadow-glow' : 'text-muted hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 rounded-3xl border border-ember/20 bg-ember/10 p-4 text-sm text-muted">
        Realtime seat locks, food stock and ticket validation are monitored from this command center.
      </div>
    </aside>
  );
}
