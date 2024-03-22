import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => {
        return {
          url: "/getAllProductsByPromotor",
          method: "GET",
        }
      },
      providesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/setOrderDelete?Id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),
    editOrderDetails: builder.mutation({
      query: (data) => ({
        url: `/updateOrderCustomer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
})

export const {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useEditOrderDetailsMutation,
} = orderApi
