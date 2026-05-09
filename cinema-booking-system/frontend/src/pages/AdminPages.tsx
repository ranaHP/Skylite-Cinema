import type { ReactNode } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { LucideIcon } from 'lucide-react';
import {
  BellRing,
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  Edit3,
  FileText,
  Film,
  Megaphone,
  PauseCircle,
  PhoneCall,
  Popcorn,
  ShieldCheck,
  Ticket,
  UploadCloud,
  Users,
} from 'lucide-react';
import { cinemas, food, movies, shows } from '../data';

const revenue = [
  { d: 'Mon', v: 12000 },
  { d: 'Tue', v: 18000 },
  { d: 'Wed', v: 15000 },
  { d: 'Thu', v: 26000 },
  { d: 'Fri', v: 42000 },
  { d: 'Sat', v: 51000 },
  { d: 'Sun', v: 39000 },
];
const occupancy = [{ name: 'Booked', value: 72 }, { name: 'Open', value: 28 }];
const customers = [
  { name: 'Ahmed Nabil', email: 'ahmed.nabil@email.com', tier: 'Gold', spend: '$2,340', status: 'Active' },
  { name: 'Maya Stone', email: 'maya@moviehub.test', tier: 'VIP', spend: '$4,820', status: 'Active' },
  { name: 'Omar Reed', email: 'omar@moviehub.test', tier: 'Silver', spend: '$890', status: 'Watch' },
];
const contentBlocks = [
  { title: 'Hero banner', owner: 'Marketing', status: 'Published', action: 'Edit copy / media' },
  { title: 'Offers section', owner: 'Growth', status: 'Scheduled', action: 'Manage coupons' },
  { title: 'Contact details', owner: 'Operations', status: 'Published', action: 'Update phone, email, map' },
  { title: 'Terms & privacy', owner: 'Legal', status: 'Draft', action: 'Review content' },
];
const assets = [
  { name: 'dune-banner.svg', type: 'Hero banner', size: '84 KB', status: 'Live' },
  { name: 'spider-neon-poster.webp', type: 'Poster', size: '420 KB', status: 'Pending review' },
  { name: 'combo-offer.png', type: 'Food promo', size: '310 KB', status: 'Live' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <Header title="Command Center" sub="Realtime operation view for bookings, shows, food, support, and content health." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Ticket} k="Total bookings" v="18,420" note="+18% vs last week" />
        <Metric icon={Film} k="Today shows" v="126" note="9 postponed" />
        <Metric icon={Popcorn} k="Food sales" v="$12.8k" note="Combos lead" />
        <Metric icon={Users} k="Occupancy" v="72%" note="IMAX at 88%" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <Panel title="Revenue summary" action="Export CSV">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenue}>
              <CartesianGrid stroke="rgba(255,255,255,.08)" />
              <XAxis dataKey="d" stroke="#B3B3B3" />
              <YAxis stroke="#B3B3B3" />
              <Tooltip contentStyle={{ background: '#121212', border: '1px solid rgba(255,122,0,.25)' }} />
              <Line type="monotone" dataKey="v" stroke="#FF7A00" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Live occupancy" action="Seat locks">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={occupancy} dataKey="value" innerRadius={70} outerRadius={110}>
                {occupancy.map((_, index) => <Cell key={index} fill={index ? '#412302' : '#FF7A00'} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>
      <Panel title="Recent operations" action="Open audit log">
        <AdminTable
          headers={['Event', 'Owner', 'Context', 'Status']}
          rows={[
            ['BK45 checked in', 'Staff kiosk', 'Dune • Screen 5', 'Completed'],
            ['Show postponed', 'Cinema admin', 'Batman • Noir Screen', 'Needs notification'],
            ['Hero banner updated', 'Marketing', 'Home CMS', 'Published'],
          ]}
        />
      </Panel>
    </div>
  );
}

export function AdminMovies() {
  return (
    <div className="space-y-6">
      <Header title="Movie Management" sub="Publish movies, upload posters/banners, set status, and manage trailers/cast." />
      <div className="grid gap-4 md:grid-cols-3">
        {movies.map((movie) => (
          <div className="glass overflow-hidden rounded-[28px] p-4" key={movie.id}>
            <img src={movie.poster} alt={movie.title} className="h-56 w-full rounded-2xl object-cover" />
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold">{movie.title}</h3>
                <p className="text-sm text-muted">{movie.genre}</p>
              </div>
              <span className="rounded-full bg-ember/15 px-3 py-1 text-xs text-ember">{movie.status.replace('_', ' ')}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-ember-gradient px-3 py-2 text-sm font-bold"><Edit3 className="mr-1 inline" size={15} /> Edit</button>
              <button className="rounded-xl border border-white/10 px-3 py-2 text-sm">Unpublish</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminShows() {
  return (
    <div className="space-y-6">
      <Header title="Show Management" sub="Add shows, call showtimes, postpone, cancel, and broadcast changes to customers." />
      <div className="grid gap-4 md:grid-cols-4">
        <ActionCard icon={CalendarPlus} title="Add show" text="Create movie, cinema, hall, date, time, and price." />
        <ActionCard icon={PauseCircle} title="Postpone" text="Move showtime and auto-notify ticket holders." />
        <ActionCard icon={PhoneCall} title="Call showtime" text="Send staff call sheet and customer reminder." />
        <ActionCard icon={BellRing} title="Broadcast" text="Email, in-app, and push notification templates." />
      </div>
      <Panel title="Weekly show volume" action="Create schedule">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={revenue}>
            <CartesianGrid stroke="rgba(255,255,255,.08)" />
            <XAxis dataKey="d" stroke="#B3B3B3" />
            <YAxis stroke="#B3B3B3" />
            <Tooltip contentStyle={{ background: '#121212' }} />
            <Bar dataKey="v" fill="#FF7A00" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="Show control board" action="Bulk edit">
        <AdminTable
          headers={['Movie', 'Cinema / Hall', 'Time', 'Controls']}
          rows={shows.slice(0, 6).map((show) => {
            const movie = movies.find((item) => item.id === show.movieId)?.title ?? 'Unknown';
            const cinema = cinemas.find((item) => item.id === show.cinemaId)?.name ?? 'Unknown';
            return [movie, `${cinema} • ${show.hall}`, `${show.date} • ${show.time}`, 'Postpone / Cancel / Call'];
          })}
        />
      </Panel>
    </div>
  );
}

export function AdminBookings() {
  return (
    <div className="space-y-6">
      <Header title="Booking Management" sub="Search booking ID, validate QR tickets, refund, cancel, and perform manual staff bookings." />
      <div className="grid gap-4 md:grid-cols-3">
        <ActionCard icon={CheckCircle2} title="Validate QR" text="Scan ticket once and mark as used." />
        <ActionCard icon={Ticket} title="Manual booking" text="Staff-assisted booking with seat lock safety." />
        <ActionCard icon={ShieldCheck} title="Refund rules" text="Cancellation windows, status tracking, and audit trail." />
      </div>
      <Panel title="Booking queue" action="Search all">
        <AdminTable
          headers={['Booking', 'Customer', 'Movie', 'Action']}
          rows={['BK45', 'BK62', 'BK88', 'BK104'].map((booking, index) => [booking, customers[index % customers.length].name, movies[index % movies.length].title, 'View / Refund / Resend'])}
        />
      </Panel>
    </div>
  );
}

export function AdminCustomers() {
  return (
    <div className="space-y-6">
      <Header title="Customer Management" sub="Create customers, block/unblock accounts, review booking history, loyalty tiers, and support notes." />
      <Panel title="Customers" action="Add customer">
        <AdminTable headers={['Name', 'Email', 'Tier', 'Status']} rows={customers.map((customer) => [customer.name, customer.email, `${customer.tier} • ${customer.spend}`, customer.status])} />
      </Panel>
    </div>
  );
}

export function AdminContent() {
  return (
    <div className="space-y-6">
      <Header title="Content Management" sub="Manage every frontend content area: hero banners, offers, food promos, contact, terms, privacy, and notifications." />
      <div className="grid gap-4 md:grid-cols-2">
        {contentBlocks.map((block) => (
          <div key={block.title} className="glass rounded-[28px] p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-ember">{block.owner}</p>
                <h3 className="mt-1 text-xl font-black">{block.title}</h3>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{block.status}</span>
            </div>
            <p className="text-sm text-muted">{block.action}</p>
            <button className="mt-5 rounded-2xl bg-ember-gradient px-4 py-3 text-sm font-black">Manage content</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminFiles() {
  return (
    <div className="space-y-6">
      <Header title="File & Asset Manager" sub="Upload posters, banners, trailers, food images, and CMS media with review status." />
      <section className="glass rounded-[32px] border-dashed p-8 text-center">
        <UploadCloud className="mx-auto text-ember" size={42} />
        <h2 className="mt-4 text-2xl font-black">Drop files to add cinema assets</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">Supports local upload now and Cloudinary/S3 production drivers via backend upload service.</p>
        <button className="mt-5 rounded-2xl bg-ember-gradient px-6 py-3 font-black">Choose files</button>
      </section>
      <Panel title="Asset library" action="Review queue">
        <AdminTable headers={['File', 'Type', 'Size', 'Status']} rows={assets.map((asset) => [asset.name, asset.type, asset.size, asset.status])} />
      </Panel>
    </div>
  );
}

export function AdminSettings() {
  const fields = ['Site name', 'Theme color', 'Currency', 'Tax percentage', 'Booking timeout', 'Cancellation rules', 'Contact phone', 'Contact email', 'Social links'];
  return (
    <div className="space-y-6">
      <Header title="Settings" sub="System, payments, theme, contact, policy, and booking rules." />
      <div className="grid gap-3 md:grid-cols-2">
        {fields.map((field) => (
          <label className="glass rounded-2xl p-4" key={field}>
            <span className="text-sm text-muted">{field}</span>
            <input className="mt-2 w-full bg-transparent font-semibold outline-none" defaultValue={field === 'Site name' ? 'Movie Hub / Lite Cinema' : ''} />
          </label>
        ))}
      </div>
    </div>
  );
}

function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <p className="text-ember">Admin panel</p>
      <h1 className="text-4xl font-black tracking-[-0.04em]">{title}</h1>
      <p className="mt-2 max-w-3xl text-muted">{sub}</p>
    </div>
  );
}

function Metric({ icon: Icon, k, v, note }: { icon: LucideIcon; k: string; v: string; note: string }) {
  return (
    <div className="glass rounded-[28px] p-5">
      <Icon className="text-ember" />
      <p className="mt-4 text-sm text-muted">{k}</p>
      <b className="text-3xl">{v}</b>
      <p className="mt-2 text-xs text-ember">{note}</p>
    </div>
  );
}

function ActionCard({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <button className="glass rounded-[28px] p-5 text-left transition hover:-translate-y-1 hover:border-ember/50">
      <Icon className="text-ember" />
      <h3 className="mt-4 font-black">{title}</h3>
      <p className="mt-2 text-sm text-muted">{text}</p>
    </button>
  );
}

function Panel({ title, action, children }: { title: string; action?: string; children: ReactNode }) {
  return (
    <section className="glass rounded-[32px] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-black">{title}</h2>
        {action ? <button className="rounded-xl border border-ember/30 px-3 py-2 text-sm text-ember">{action}</button> : null}
      </div>
      {children}
    </section>
  );
}

function AdminTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="cinema-scroll overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-muted">
          <tr>{headers.map((header) => <th className="p-3" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr className="border-t border-white/10" key={row.join('-')}>
              {row.map((cell, index) => <td className={`p-3 ${index === 0 ? 'font-bold text-ember' : ''}`} key={cell}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
