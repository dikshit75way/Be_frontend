import { baseApi } from "../EventApi/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    fetchUser: builder.query({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useLoginMutation ,
  useRegisterMutation ,
  useFetchUserQuery
} = authApi
