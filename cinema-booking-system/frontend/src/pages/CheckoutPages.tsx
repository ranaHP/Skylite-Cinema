import { useMemo, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, CreditCard, LockKeyhole, Plus, Shield, Sparkles, TicketCheck, Wifi, type LucideIcon } from 'lucide-react';
import { demoBooking, food, movies, shows } from '../data';
import { money, shortDate } from '../utils/format';

interface CheckoutState { movieId?: string; showId?: string; seats?: string[]; }

export function CheckoutPage() {
  const { state } = useLocation();
  const checkoutState = (state ?? {}) as CheckoutState;
  const movie = movies.find((item) => item.id === checkoutState.movieId) ?? demoBooking.movie;
  const show = shows.find((item) => item.id === checkoutState.showId) ?? demoBooking.show;
  const selectedSeats = checkoutState.seats?.length ? checkoutState.seats : demoBooking.seats.map((seat) => seat.id);
  const [addons, setAddons] = useState<string[]>(['combo-1']);
  const [coupon, setCoupon] = useState('SKYLITE10');
  const ticketTotal = selectedSeats.length * show.basePrice;
  const foodTotal = food.filter((item) => addons.includes(item.id)).reduce((amount, item) => amount + item.price, 0);
  const discount = coupon.trim().toUpperCase() === 'SKYLITE10' ? 10 : 0;
  const tax = useMemo(() => Math.max(ticketTotal + foodTotal - discount, 0) * 0.14, [ticketTotal, foodTotal, discount]);
  const total = Math.max(ticketTotal + foodTotal - discount, 0) + tax;

  return (
    <div className="mx-auto max-w-6xl py-5 md:py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <Link to={`/booking/${movie.id}`} className="mb-3 inline-flex items-center gap-2 text-sm text-muted hover:text-ember"><ChevronLeft size={16} /> Back to seats</Link>
          <p className="text-sm font-semibold text-ember">Secure checkout</p>
          <h1 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">Finish your SkyLite booking</h1>
        </div>
        <div className="hidden rounded-2xl border border-ember/25 bg-ember/10 px-4 py-3 text-sm text-ember md:block"><LockKeyhole className="mr-2 inline" size={16} /> Encrypted</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_390px]">
        <section className="space-y-5">
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass overflow-hidden rounded-[34px] p-5">
            <div className="grid gap-4 md:grid-cols-[150px_1fr]">
              <img src={movie.poster} alt={movie.title} className="h-56 w-full rounded-3xl object-cover md:h-full" />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.24em] text-ember">Booking summary</p>
                <h2 className="mt-2 text-2xl font-black md:text-3xl">{movie.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{movie.genre} • {movie.duration}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                  <SummaryPill label="Date" value={shortDate(show.date)} />
                  <SummaryPill label="Time" value={show.time} />
                  <SummaryPill label="Hall" value={show.hall} />
                  <SummaryPill label="Seats" value={selectedSeats.join(', ')} />
                </div>
              </div>
            </div>
          </motion.section>

          <CheckoutPanel title="Payment method" icon={CreditCard}>
            <div className="grid gap-3 md:grid-cols-2">
              <PaymentCard brand="VISA" last="4242" active />
              <PaymentCard brand="mastercard" last="0338" />
            </div>
            <button className="mt-3 w-full rounded-2xl border border-dashed border-ember/50 py-4 font-bold text-ember"><Plus className="inline" /> Add New Card</button>
            <p className="mt-4 flex gap-2 rounded-2xl bg-white/5 p-3 text-sm text-muted"><Shield className="shrink-0 text-ember" /> Industry-standard encryption protects every transaction.</p>
          </CheckoutPanel>

          <CheckoutPanel title="Food & drinks" icon={Sparkles}>
            <div className="grid gap-3 sm:grid-cols-3">
              {food.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAddons((value) => (value.includes(item.id) ? value.filter((id) => id !== item.id) : [...value, item.id]))}
                  className={`overflow-hidden rounded-3xl border text-left transition ${addons.includes(item.id) ? 'border-ember bg-ember/10 shadow-glow' : 'border-white/10 bg-white/5'}`}
                >
                  <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
                  <div className="p-3"><b>{item.name}</b><p className="text-sm text-muted">{item.stock} in stock</p><p className="text-ember">{money(item.price)}</p></div>
                </button>
              ))}
            </div>
          </CheckoutPanel>
        </section>

        <aside className="glass h-fit rounded-[34px] p-5 lg:sticky lg:top-24">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black">Order total</h2><TicketCheck className="text-ember" /></div>
          <label className="mb-4 block rounded-2xl bg-white/5 p-3"><span className="text-xs text-muted">Coupon</span><input value={coupon} onChange={(event) => setCoupon(event.target.value)} className="mt-1 w-full bg-transparent font-bold outline-none" /></label>
          <Line k="Tickets" v={money(ticketTotal)} />
          <Line k="Food" v={money(foodTotal)} />
          <Line k="Discount" v={`-${money(discount)}`} />
          <Line k="Tax" v={money(tax)} />
          <div className="my-4 border-t border-white/10" />
          <Line k="Total" v={money(total)} strong />
          <Link to="/confirmation" className="mt-5 block rounded-2xl bg-ember-gradient py-4 text-center font-black shadow-glow">Confirm Booking</Link>
          <p className="mt-3 text-center text-xs text-muted">Seats remain locked until payment completes.</p>
        </aside>
      </div>
    </div>
  );
}

function CheckoutPanel({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return <section className="glass rounded-[32px] p-5"><h2 className="mb-4 flex items-center gap-2 font-black"><Icon className="text-ember" /> {title}</h2>{children}</section>;
}
function SummaryPill({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-white/5 p-3"><p className="text-xs text-muted">{label}</p><p className="mt-1 truncate font-bold">{value}</p></div>; }
function PaymentCard({ brand, last, active = false }: { brand: string; last: string; active?: boolean }) { return <div className={`rounded-3xl border p-4 ${active ? 'border-ember bg-ember-gradient' : 'border-white/10 bg-white/5'}`}><div className="flex justify-between"><b>{brand}</b>{active && <span className="text-xs"><Check size={14} className="inline" /> DEFAULT</span>}</div><p className="mt-4">**** **** **** {last}</p><div className="mt-4 flex justify-between text-xs"><span>Card Holder<br />Mohamed</span><Wifi /></div></div>; }
function Line({ k, v, strong = false }: { k: string; v: string; strong?: boolean }) { return <div className={`flex justify-between py-2 ${strong ? 'text-xl font-black' : 'text-sm text-muted'}`}><span>{k}</span><span>{v}</span></div>; }

export function ConfirmationPage() {
  return (
    <div className="mh-screen -mx-3 space-y-5 px-3 pt-5 text-center">
      <Link to="/checkout" className="absolute left-4 top-5"><ChevronLeft size={22} /></Link>
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-ember text-ember"><Check size={42} /></div>
      <div><h1 className="text-2xl font-bold">Booking Confirmed!</h1><p className="mt-1 text-sm text-[#b3b3b3]">Your Tickets Have Been Booked Successfully.</p></div>
      <section className="overflow-hidden rounded-xl bg-[#151515] text-left">
        <div className="flex gap-4 p-4"><img src={demoBooking.movie.poster} alt={demoBooking.movie.title} className="h-32 w-32 rounded-lg object-cover"/><div className="min-w-0 flex-1"><div className="flex justify-between"><h2 className="font-bold">{demoBooking.movie.title}</h2><span>⋮</span></div><p className="text-xs text-[#b3b3b3]">Sci-Fi, Adventure</p><p className="mt-4 space-y-2 text-xs text-[#d6d6d6]">📅 Fri, May 24, 2024<br/>🕒 07:45 PM<br/>📍 JCX Cinema 25<br/>🎟️ Screen 5 • Row F • Seats 14, 15</p></div></div>
        <div className="grid grid-cols-4 border-y border-dashed border-white/10 p-3 text-[10px] text-[#b3b3b3]"><span>BOOKING ID<br/><b className="text-white">BK45</b></span><span>DATE<br/><b className="text-white">17.05.24</b></span><span>TOTAL<br/><b className="text-white">$72.00</b></span><span>PAYMENT<br/><b className="text-white">•••• 4242</b></span></div>
        <div className="grid place-items-center p-6"><div className="grid h-40 w-40 place-items-center rounded-lg bg-white text-black"><span className="text-8xl">▦</span></div></div>
      </section>
      <div className="space-y-3"><Link to="/tickets" className="mh-button block py-4">View Tickets</Link><Link to="/" className="mh-button block py-4">Back To Home</Link></div>
    </div>
  );
}
