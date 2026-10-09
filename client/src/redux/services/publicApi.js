import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/public",
  }),
  endpoints: (builder) => ({
    getPublicPricing: builder.query({
      query: () => "/pricing",
    }),
  }),
});

export const { useGetPublicPricingQuery } = publicApi;
