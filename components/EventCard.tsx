import { MapPin, Users } from 'lucide-react'
import { useRouter } from 'next/navigation';

interface EventCardProps {
  event: {
    _id: string;
    id: string;
    title: string;
    description: string;
    venue: {
      name: string;
      address: string;
      seats: Array<{
        seatNumber: string;
        category: string;
        basePrice: number;
        _id?: string;
      }>;
    };
    startAt: string;
    createdBy: string;
    seatStatus: Array<{
      seatNumber: string;
      status: "available" | "reserved" | "booked";
      price: number;
      reservedBy?: string | null;
      reservedAt?: string | null;
      _id?: string;
    }>;
    image?: {
      public_id?: string;
      url?: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalSeats: number;
    availableSeats: number;
    reservedSeats: number;
    bookedSeats: number;
  }
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();
  return (
    <div 
    onClick={() =>router.push(`/event/${event._id}`)}
      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary transition-all cursor-pointer"
    >
      <div className="relative overflow-hidden bg-muted h-48">
        <img
          src={event.image?.url || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {/* Removed price tag because you don’t have price */}
      </div>

      <div className="p-4">

        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 text-balance">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {event.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.venue.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{event.availableSeats} seats available</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {new Date(event.startAt).toLocaleDateString()} • {new Date(event.startAt).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  )
}
