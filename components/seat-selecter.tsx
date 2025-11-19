'use client'

import { ISeat } from "@/app/redux/types/events"

interface SeatSelectorProps {
  selectedSeats: string[]
  onSelectSeat: (seatId: string) => void
  seats: ISeat[] | undefined // backend may send undefined initially
}

export default function SeatSelector({
  selectedSeats,
  onSelectSeat,
  seats
}: SeatSelectorProps) {

  // Always ensure seats is an array
  const safeSeats = Array.isArray(seats) ? seats : [];

  // Group seats by row
  const groupedSeats = safeSeats.reduce((acc, seat) => {
    const row = seat.seatId[0]; // extract row letter (A, B, C)
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, ISeat[]>);

  return (
    <div className="flex flex-col items-center gap-6 overflow-x-auto">

      {/* Stage Label */}
      <div className="text-center">
        <div className="inline-block border-2 border-muted-foreground px-6 py-2 rounded-full">
          <span className="text-muted-foreground font-semibold">STAGE</span>
        </div>
      </div>

      {/* Render seats row-wise */}
      <div className="flex flex-col gap-4 p-4 bg-background rounded-lg">
        {Object.keys(groupedSeats).sort().map((row) => (
          <div key={row} className="flex items-center gap-2 justify-center">

            {/* Row label left */}
            <span className="w-6 text-center text-sm font-semibold text-muted-foreground">
              {row}
            </span>

            <div className="flex gap-2">
              {groupedSeats[row].map((seat) => {
                const isSelected = selectedSeats.includes(seat.seatId);
                console.log(seat.status)
                const isSold = seat.status !== "available";

                return (
                  <button
                    key={seat.seatId}
                    onClick={() => !isSold && onSelectSeat(seat.seatId)}
                    disabled={isSold}
                    className={`w-8 h-8 rounded transition-all ${
                      isSold
                        ? "bg-muted cursor-not-allowed"
                        : isSelected
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-card border-2 border-border hover:border-primary"
                    }`}
                  >
                    <span className="text-xs">
                      {seat.seatId.slice(1)} {/* Only seat number */}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Row label right */}
            <span className="w-6 text-center text-sm font-semibold text-muted-foreground">
              {row}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}
