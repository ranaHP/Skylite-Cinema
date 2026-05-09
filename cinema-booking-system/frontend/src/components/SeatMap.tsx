import { motion } from 'framer-motion';
import type { Seat } from '../types/domain';

const seatClass: Record<string, string> = {
  available: 'bg-white/15 text-white hover:bg-white/25',
  selected: 'bg-ember-gradient text-white shadow-glow',
  booked: 'cursor-not-allowed bg-white/35 text-white/45',
  locked: 'cursor-not-allowed bg-yellow-500/40 text-yellow-100',
  reserved: 'cursor-not-allowed bg-purple-500/40 text-purple-100',
};

export function SeatMap({
  seats,
  selected,
  onToggle,
}: {
  seats: Seat[];
  selected: string[];
  onToggle: (seat: Seat) => void;
}) {
  const rows = [...new Set(seats.map((seat) => seat.row))];

  return (
    <div className="cinema-scroll -mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
      <div className="mx-auto min-w-[390px] max-w-xl rounded-[28px] bg-white/[0.02] p-3 md:min-w-[430px] md:p-4">
        <div className="screen-arc mx-auto w-64 md:w-72" />
        <p className="mb-4 text-center text-[10px] uppercase tracking-[0.3em] text-muted md:text-xs">Screen</p>
        {rows.map((row) => (
          <div key={row} className="mb-2 grid grid-cols-[22px_repeat(10,1fr)] gap-1.5 md:grid-cols-[24px_repeat(10,1fr)] md:gap-2">
            <span className="self-center text-xs text-muted md:text-sm">{row}</span>
            {seats
              .filter((seat) => seat.row === row)
              .map((seat) => {
                const state = selected.includes(seat.id) ? 'selected' : seat.state;
                return (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    key={seat.id}
                    type="button"
                    disabled={seat.state !== 'available'}
                    aria-label={`Seat ${seat.id} ${state}`}
                    onClick={() => onToggle(seat)}
                    className={`h-8 min-w-8 rounded-lg text-[11px] font-semibold md:text-xs ${seatClass[state]}`}
                  >
                    {seat.number}
                  </motion.button>
                );
              })}
          </div>
        ))}
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-xs text-muted md:gap-5">
          <Legend color="bg-white/15" text="Available" />
          <Legend color="bg-ember-gradient" text="Selected" />
          <Legend color="bg-white/35" text="Booked" />
        </div>
      </div>
    </div>
  );
}

function Legend({ color, text }: { color: string; text: string }) {
  return (
    <span className="flex items-center gap-2">
      <i className={`h-4 w-4 rounded ${color}`} />
      {text}
    </span>
  );
}
