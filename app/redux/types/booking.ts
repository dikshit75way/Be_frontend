export interface bookingDto {
  userId: string;
  eventId: string;
  total: number;
  selectedSeats: string[];
}

export interface resBooking {
  data: object | null | any;
  message: string;
  success: boolean;
}
