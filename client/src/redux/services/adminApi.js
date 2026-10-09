import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_API } from "../../Api" // Base API URL constant

const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}admin`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "PayPeriods", "Features"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUserPlan: builder.query({
      query: (userId) => `/users/${userId}/plan`,
      providesTags: ["Users"],
    }),
    
    getPayperiods: builder.query({
      query: () => "/payperiods",
      providesTags: ["PayPeriods"],
    }),
    createPayperiod: builder.mutation({
      query: (payload) => ({
        url: "/payperiods",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PayPeriods"],
    }),
    updatePayperiod: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/payperiods/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["PayPeriods"],
    }),
    deletePayperiod: builder.mutation({
      query: (id) => ({
        url: `/payperiods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PayPeriods"],
    }),

    getFeatures: builder.query({
      query: () => "/features",
      providesTags: ["Features"],
    }),
    createFeature: builder.mutation({
      query: (payload) => ({
        url: "/features",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Features"],
    }),
    updateFeature: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/features/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Features"],
    }),
    deleteFeature: builder.mutation({
      query: (id) => ({
        url: `/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Features"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserPlanQuery,
  useGetPayperiodsQuery,
  useCreatePayperiodMutation,
  useUpdatePayperiodMutation,
  useDeletePayperiodMutation,
  useGetFeaturesQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = adminApi;
