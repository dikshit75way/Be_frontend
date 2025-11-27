// Venue Seat Interface (from venueSeatSchema)
export interface IVenueSeat {
  _id?: string;
  seatNumber: string;
  category: string;
  basePrice: number;
}

// Event Seat Status Interface (from eventSeatStatusSchema)
export interface IEventSeatStatus {
  _id?: string;
  seatNumber: string;
  status: "available" | "reserved" | "booked";
  price: number;
  reservedBy: string | null;
  reservedAt: string | null;
}

// Venue Interface
export interface IVenue {
  name: string;
  address: string;
  seats: IVenueSeat[];
}

// Event Image Interface
export interface IEventImage {
  public_id?: string;
  url?: string;
}

// Event Interface (UPDATED TO MATCH BACKEND SCHEMA)
export interface IEvent {
  _id: string;   // backend _id
  id: string;    // backend also returns id
  title: string;
  description: string;
  
  // UPDATED: venue is now an object with seats array
  venue: IVenue;
  
  startAt: string | Date;
  createdBy: string;

  // UPDATED: renamed from 'seats' to 'seatStatus' to match backend
  seatStatus: IEventSeatStatus[];

  // UPDATED: made optional to match backend schema
  image?: IEventImage;

  createdAt: string;
  updatedAt: string;
  __v: number;

  // Virtual fields from backend
  totalSeats: number;
  availableSeats: number;
  reservedSeats: number;
  bookedSeats: number;
}

// API Response Wrapper
export interface IFetchEventResponse {
  success: boolean;
  message: string;
  data: object | null | any;
}