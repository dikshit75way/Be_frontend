import { baseApi } from "./baseApi";
import { IEvent, IFetchEventResponse } from "../types/events";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<IFetchEventResponse, void>({
      query: () => "/event",
    }),

    getEventById: builder.query<IFetchEventResponse, string>({
      query: (id) => `/event/${id}`,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventByIdQuery } = eventApi;
