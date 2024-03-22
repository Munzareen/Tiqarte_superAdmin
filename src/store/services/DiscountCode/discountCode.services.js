import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const discountCodeApi = createApi({
  reducerPath: "discountCodeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["DiscountCode"],
  endpoints: (builder) => ({
    getAllDiscountCode: builder.query({
      query: () => {
        return {
          url: "/getAllDiscountCode",
          method: "GET",
        }
      },
      providesTags: ["DiscountCode"],
    }),
    addDiscountCode: builder.mutation({
      query: (discountCode) => ({
        url: "/addDiscountCode",
        method: "POST",
        body: discountCode,
      }),
      invalidatesTags: ["DiscountCode"],
    }),

    editDiscountCode: builder.mutation({
      query: (data) => {
        return {
          url: `/editDiscountCode`,
          method: "PUT",
          body: data,
        }
      },
      invalidatesTags: ["Venues"],
    }),

    deleteDiscountCode: builder.mutation({
      query: (id) => {
        // console.log(id)
        return {
          url: `/deleteDiscountCode?Id=${id}`,
          method: "DELETE",
          // body: venueData,
        }
      },
      invalidatesTags: ["DiscountCode"],
    }),
  }),
})

export const {
  useAddDiscountCodeMutation,
  useGetAllDiscountCodeQuery,
  useDeleteDiscountCodeMutation,
  useEditDiscountCodeMutation
} = discountCodeApi
