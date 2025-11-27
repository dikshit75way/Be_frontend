'use client'

import {  IEventSeatStatus } from "@/app/redux/types/events" // Updated import

interface SeatSelectorProps {
  selectedSeats: string[]
  onSelectSeat: (seatNumber: string) => void
  seats: IEventSeatStatus | undefined // Updated to IEventSeatStatus
}

export default function SeatSelector({
  selectedSeats,
  onSelectSeat,
  seats
}: SeatSelectorProps) {

  // Always ensure seats is an array

  const safeSeats = Array.isArray(seats) ? seats : [];

  // Group seats by row
  if(!safeSeats) return null ;
  const groupedSeats = safeSeats.reduce((acc, seat) => {
    const row = seat.seatNumber[0]; // extract row letter (A, B, C)
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, IEventSeatStatus[]>);

  // Get seat status with proper typing
  const getSeatStatus = (seat: IEventSeatStatus) => {
    return seat.status; // "available" | "reserved" | "booked"
  };

  // Check if seat is available for selection
  const isSeatAvailable = (seat: IEventSeatStatus) => {
    return seat.status === "available";
  };

  // Check if seat is sold (booked or reserved by someone else)
  const isSeatSold = (seat: IEventSeatStatus) => {
    return seat.status === "booked";
  };

   const isReserved = (seat: IEventSeatStatus) => {
    return  seat.status === "reserved";
  };


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
              {groupedSeats[row].map((seat : IEventSeatStatus) => {
                const isSelected = selectedSeats.includes(seat.seatNumber);
                const isAvailable = isSeatAvailable(seat);
                const isSold = isSeatSold(seat);
                 const isreserved = isReserved(seat);
                const status = getSeatStatus(seat);

                // Different styles based on exact status
                const getButtonStyles = () => {
                  if (isSold || isreserved) {
                    if (status === "booked" || status==="reserved") {
                      return "bg-muted cursor-not-allowed"; // Red for booked
                    } 
                  }
                  
                  if (isSelected) {
                    return "bg-primary text-primary-foreground scale-110"; // Selected
                  }
                  
                  return "bg-card border-2 border-border hover:border-primary"; // Available
                };

                return (
                  <button
                    key={seat.seatNumber}
                    onClick={() => isAvailable && onSelectSeat(seat.seatNumber)}
                    disabled={!isAvailable}
                    className={`w-8 h-8 rounded transition-all flex items-center justify-center ${getButtonStyles()}`}
                    title={`Seat ${seat.seatNumber} - ${status}${seat.reservedBy ? ` (Reserved by: ${seat.reservedBy})` : ''}`}
                  >
                    <span className="text-xs font-medium">
                      {seat.seatNumber.slice(1)} {/* Only seat number */}
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

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-card border border-border rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-primary rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Reserved</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-destructive rounded"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}