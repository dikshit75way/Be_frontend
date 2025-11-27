/* eslint-disable @typescript-eslint/ban-ts-comment */

import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearAuth, setCredentials } from "../slices/authSlice";
import type { RootState } from "../store";
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  const  result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
     // @ts-ignore
    result.error.data?.type === "TOKEN_EXPIRED"
  ) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(clearAuth());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/users/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    const data = refreshResult.data as {
      accessToken: string;
      refreshToken: string;
    };

    if (data) {
      api.dispatch(
        setCredentials({
          user: (api.getState() as RootState).auth.user!,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      // retry original request with new token
      return await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearAuth());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
