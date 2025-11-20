import { baseApi } from "../EventApi/baseApi";
import { IResponse, loginDto, registerDto } from "../types/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse , loginDto>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation<IResponse ,registerDto>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    fetchUser: builder.query({
      query: (id) => `/auth/${id}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchUserQuery,
} = authApi;
