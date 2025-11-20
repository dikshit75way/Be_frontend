import { baseApi } from "../EventApi/baseApi";
import { bookingDto, resBooking } from "../types/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addbooking: builder.mutation<resBooking, bookingDto>({
      query: (body) => ({
        url: `/booking/${body.eventId}/book`,
        method: "POST",
        body,
      }),
    }),
    fetchBookings: builder.query<any , void>({
      query: () => "/booking",
    }),

    fetchSingleBooking : builder.query({
      query : (id) => `/booking/${id}`
    })
  }),
});

export const {useAddbookingMutation , useFetchBookingsQuery , useFetchSingleBookingQuery} = bookingApi
