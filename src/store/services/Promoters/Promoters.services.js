import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const promoterApi = createApi({
  reducerPath: "promoterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Promoters"],
  endpoints: (builder) => ({
    getAllEventPromoters: builder.query({
      query: () => {
        return {
          url: "/getAllEventPromotor",
          method: "GET",
        }
      },
      providesTags: ["Promoters"],
    }),
    addEventPromoter: builder.mutation({
      query: (promoterData) => ({
        url: "/addEventPromotor",
        method: "POST",
        body: promoterData,
      }),
      invalidatesTags: ["Promoters"],
    }),

    editEventPromotor: builder.mutation({
      query: (data) => {
        return {
          url: `/editEventPromotor`,
          method: "PUT",
          body: data,
        }
      },
      invalidatesTags: ["Promoters"],
    }),

    deleteEventPromotor: builder.mutation({
      query: (id) => ({
        url: `/deleteEventPromotor?Id=${id}`,

        method: "DELETE",
      }),
      invalidatesTags: ["Promoters"],
    }),
  }),
})

export const {
  useAddEventPromoterMutation,
  useGetAllEventPromotersQuery,
  useDeleteEventPromotorMutation,
  useEditEventPromotorMutation
} = promoterApi
