import { baseApi } from "../EventApi/baseApi";
import { bookingDto } from "../types/booking";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addbooking: builder.mutation<bookingDto, bookingDto>({
      query: (body) => ({
        url: `/booking/${body.eventId}/book`,
        method: "POST",
        body,
      }),
    }),
    fetchBookings: builder.query({
      query: () => "/booking",
    }),
  }),
});

export const {useAddbookingMutation , useFetchBookingsQuery} = bookingApi
