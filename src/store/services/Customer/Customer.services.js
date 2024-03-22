import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token");
      console.log("Authorization", `Bearer ${accessToken}`);
      headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => {
        return {
          url: "/getCustomers",
          method: "GET",
        };
      },
      providesTags: ["Customers"],
    }),
    createCustomer: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/CreateCustomer",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Customers"],
    }),

    getCustomerDetail: builder.query({
      query: (userId) => {
        return {
          url: `/getCustomersDetails?UserId=${userId}`,
          method: "GET",
        };
      },
      invalidatesTags: ["Customers"],
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/DeleteCustomer?UserId=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomerDetails: builder.mutation({
      query: (data) => ({
        url: "/UpdateCustomerDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomerBillingAddress: builder.mutation({
      query: (data) => ({
        url: "/UpdateCustomerBillingAddress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    updateCustomerNotes: builder.mutation({
      query: (data) => ({
        url: "/UpdateCustomerNotes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useCreateCustomerMutation,
  useDeleteCustomerMutation,
  useGetCustomerDetailQuery,
  useUpdateCustomerDetailsMutation,
  useUpdateCustomerBillingAddressMutation,
  useUpdateCustomerNotesMutation,
} = customersApi;
