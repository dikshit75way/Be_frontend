
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useAppSelector } from "../hooks";

export const baseApi = createApi({

  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api", // global base
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token
      console.log("token verification..." , token)
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: () => ({}), // we inject other modules here
});
