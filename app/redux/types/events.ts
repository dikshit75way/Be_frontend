// Seat Interface
export interface ISeat {
  _id: string; // added because backend returns _id for each seat
  seatId: string;
  price: number;
  status: "available" | "reserved" | "booked";
  reservedBy: string | null;
  reservedAt: string | null; // string or Date
}

// Event Image Interface
export interface IEventImage {
  public_id: string;
  url: string;
}

// Event Interface (FULLY MATCHED WITH BACKEND)
export interface IEvent {
  _id: string;   // backend _id
  id: string;    // backend also returns id
  title: string;
  description: string;
  venue: string;
  startAt: string | Date | any;   // ISO date string
  createdBy: string;

  seats: ISeat[];

  image: IEventImage;

  createdAt: string;
  updatedAt: string;
  __v: number;

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
