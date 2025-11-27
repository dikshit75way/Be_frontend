/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../EventApi/baseApi";


export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reserveSeats: builder.mutation({
      query: ({ eventId, seatIds, userId }) => ({
        url: `/event/${eventId}/reserve`,
        method: "POST",
        body: { seatIds, userId },
      }),
    }),


    createPaymentIntent: builder.mutation({
      query: ({ amount, eventId, seatIds, userId }) => ({
        url: `/payment/create-payment-intent`,
        method: "POST",
        body: { amount, eventId, seatIds, userId },
      }),
    }),

    fetchBookings: builder.query<any, void>({
      query: () => "/booking",
    }),

    fetchSingleBooking: builder.query({
      query: (id) => `/booking/${id}`,
    }),
  }),
});

export const {
  useReserveSeatsMutation,
  useCreatePaymentIntentMutation,
  useFetchBookingsQuery,
  useFetchSingleBookingQuery,
} = bookingApi;
