import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, Camera, ChevronRight, CreditCard, Globe2, Heart, HelpCircle, LockKeyhole, LogOut, MapPin, Moon, QrCode, Star, Ticket, UserRound } from 'lucide-react';
import { cinemas, demoBooking, movies } from '../data';

export function CinemasPage() {
  return (
    <div className="mh-screen space-y-3 pt-4">
      <Link to="/" className="inline-block"><ArrowLeft size={22} /></Link>
      <h1 className="text-base font-semibold">Theaters</h1>
      <div className="mh-search flex h-10 items-center rounded-lg px-3 text-xs text-[#b3b3b3]">Search Movies, Theaters... <span className="ml-auto">Near Me</span><button className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-ember text-white">≡</button></div>
      <div className="relative h-[140px] overflow-hidden rounded-xl bg-[#1d211e]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(255,122,0,.55),transparent_18%),linear-gradient(135deg,#252525,#111)]" /><MapPin className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ember" /></div>
      <div className="flex gap-2">{['Nearby', 'Popular', 'IMAX', 'Premium'].map((x,i)=><span key={x} className={`mh-chip ${i===0?'mh-chip-active':''}`}>{x}</span>)}</div>
      <div className="space-y-2">{cinemas.map((cinema, i)=><div key={cinema.id} className="mh-card flex items-center gap-3 rounded-xl p-3"><img src={`https://images.unsplash.com/photo-${i===0?'1489599849927-2ee91cede3ba':i===1?'1533488765986-dfa2a9939acd':i===2?'1519501025264-65ba15a82390':'1514525253161-7a46d19cd819'}?auto=format&fit=crop&w=140&q=70`} alt={cinema.name} className="h-16 w-20 rounded-lg object-cover"/><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-bold">{cinema.name}</h3><p className="text-xs text-[#b3b3b3]">{cinema.address}</p><p className="mt-1 flex items-center gap-1 text-xs"><Star size={12} fill="#f6b338" className="text-[#f6b338]"/> {cinema.rating}</p></div><button className="rounded-md bg-[#3b210d] px-3 py-2 text-[10px] text-ember">View Showtimes</button></div>)}</div>
    </div>
  );
}

export function TicketsPage() {
  return (
    <div className="mh-screen space-y-3 pt-4">
      <Link to="/" className="inline-block"><ArrowLeft size={22} /></Link><h1 className="text-base font-semibold">My Tickets</h1>
      <div className="grid grid-cols-3 rounded-full bg-[#161616] p-1 text-center text-xs"><span className="mh-chip-active rounded-full py-1">Upcoming</span><span className="py-1 text-[#b3b3b3]">Past</span><span className="py-1 text-[#b3b3b3]">Canceled</span></div>
      <TicketBlock movie={movies[0]} id="BK45" date="17.05.24" />
      <TicketBlock movie={movies[7]} id="BK62" date="17.05.24" />
    </div>
  );
}

function TicketBlock({ movie, id, date }: { movie: typeof movies[number]; id: string; date: string }) {
  return <div className="overflow-hidden rounded-xl bg-[#151515]"><div className="flex gap-4 p-3"><img src={movie.poster} alt={movie.title} className="h-28 w-24 rounded-lg object-cover"/><div><h3 className="font-bold">{movie.title}</h3><p className="text-xs text-[#b3b3b3]">{movie.genre}</p><p className="mt-3 space-y-1 text-xs text-[#d6d6d6]">📅 Fri, May 24, 2024<br/>🕒 07:45 PM<br/>🎟️ 2x (Regular 20)<br/>📍 Screen 4 • Row G • Seats 14, 15</p><p className="mt-2 text-xs font-bold text-ember">View Details ›</p></div></div><div className="grid grid-cols-4 border-y border-dashed border-white/10 p-3 text-[10px]"><span>BOOKING ID<br/><b>{id}</b></span><span>DATE<br/><b>{date}</b></span><span>TOTAL<br/><b>2,340.00</b></span><span>PAYMENT<br/><b>INPROGRESS</b></span></div><div className="flex items-center gap-4 p-3"><div className="grid h-20 w-20 place-items-center rounded-lg bg-white text-black"><QrCode size={54}/></div><div className="flex-1 text-xs"><b>FOOD & DRINKS</b><p className="text-[#b3b3b3]">Scan to view or Add to your order</p></div><button className="rounded-lg bg-[linear-gradient(180deg,#a34e06,#623000)] px-4 py-3 text-xs font-bold">VIEW MENU</button></div></div>;
}

export function ProfilePage() {
  const rows = [['Personal Information', UserRound], ['Change Password', LockKeyhole], ['Payment Methods', CreditCard], ['My Tickets', Ticket], ['Watchlist', Heart]] as const;
  return (
    <div className="mh-screen space-y-4 pt-4">
      <div className="flex items-center justify-between"><h1 className="text-base font-semibold">Your Profile</h1><span className="relative"><Bell size={20}/><i className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-ember"/></span></div>
      <div className="mh-card flex items-center gap-4 rounded-2xl border-ember/60 p-4"><div className="relative"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" className="h-20 w-20 rounded-full border-2 border-ember object-cover"/><span className="absolute bottom-0 right-0 rounded bg-white p-1 text-black"><Camera size={13}/></span></div><div className="flex-1"><h2 className="text-lg font-bold">Ahmed Nabil</h2><p className="text-xs text-[#b3b3b3]">ahmed.nabil@email.com</p></div><button className="rounded-lg bg-[#6d3505] px-4 py-2 text-xs font-bold">Edit Profile</button></div>
      <div className="grid grid-cols-4 text-center text-sm text-white">{[['24','Movies',Ticket],['17','Tickets',FilmIcon],['4.8','Rating',Star],['12','Watchlist',Heart]].map(([v,l,I]: any)=><div key={l}><I className="mx-auto text-ember" size={19}/><b className="mt-1 block text-xl">{v}</b><span className="text-xs text-[#b3b3b3]">{l}</span></div>)}</div>
      <Section title="ACCOUNT">{rows.map(([label, Icon])=><MenuRow icon={Icon} label={label}/>)}</Section>
      <Section title="PREFERENCES"><MenuRow icon={Moon} label="Dark Mode" toggle/><MenuRow icon={Bell} label="Notifications"/><MenuRow icon={Globe2} label="Language" value="English"/></Section>
      <Section title="SUPPORT"><MenuRow icon={HelpCircle} label="Help Center"/><MenuRow icon={Bell} label="Contact Us"/></Section>
      <button className="w-full rounded-lg border border-red-600/50 bg-red-950/40 py-3 text-sm text-red-400"><LogOut className="mr-2 inline" size={16}/> Log Out</button>
    </div>
  );
}
function FilmIcon(props: any){ return <Ticket {...props}/>; }
function Section({title,children}:{title:string;children:ReactNode}){ return <section><h3 className="mb-2 text-xs text-[#b3b3b3]">{title}</h3><div className="space-y-2">{children}</div></section>; }
function MenuRow({icon:Icon,label,value,toggle}:{icon:any;label:string;value?:string;toggle?:boolean}){ return <div className="mh-card flex items-center gap-3 rounded-lg px-3 py-3 text-sm"><Icon className="text-ember" size={17}/><span>{label}</span><span className="ml-auto text-[#b3b3b3]">{toggle?<i className="block h-6 w-11 rounded-full bg-ember p-1"><b className="ml-auto block h-4 w-4 rounded-full bg-white"/></i>:value||<ChevronRight size={17}/>}</span></div>; }
