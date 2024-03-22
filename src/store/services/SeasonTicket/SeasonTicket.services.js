import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const seasonTicketsApi = createApi({
  reducerPath: "seasonTicketsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["SeasonTickets"],
  endpoints: (builder) => ({
    getAllSeasonTickets: builder.query({
      query: () => {
        return {
          url: "/getSeasonTickets",
          method: "GET",
        }
      },
      providesTags: ["SeasonTickets"],
    }),
    getEventSchedules: builder.query({
      query: () => {
        return {
          url: "/getEventSchedules",
          method: "GET",
        }
      },
      providesTags: ["SeasonTickets"],
    }),
    addSeasonTicket: builder.mutation({
      query: (data) => ({
        url: "/createSeasonTicket",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SeasonTickets"],
    }),

    editSeasonTicket: builder.mutation({
      query: (data) => {
        return {
          url: `/updateSeasonTicket`,
          method: "PUT",
          body: data,
        }
      },
      invalidatesTags: ["SeasonTickets"],
    }),

    deleteSeasonTicket: builder.mutation({
      query: (id) => ({
        url: `/deleteupdateSeasonTicket?Id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SeasonTickets"],
    }),
  }),
})

export const {
  useAddSeasonTicketMutation,
  useDeleteSeasonTicketMutation,
  useEditSeasonTicketMutation,
  useGetAllSeasonTicketsQuery,
  useGetEventSchedulesQuery,
} = seasonTicketsApi
