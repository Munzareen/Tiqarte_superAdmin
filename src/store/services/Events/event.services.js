import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin/",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getAllEvent: builder.query({
      query: () => {
        return {
          url: "getEventsByPromotor?PromotorId=1",
          method: "GET",
        }
      },
      providesTags: ["Events"],
    }),
    getAllEventTickets: builder.query({
      query: () => {
        return {
          url: "getAllEventTicketsByPromotor?PromotorId=1",
          method: "GET",
        }
      },
      providesTags: ["Events"],
    }),
    addEvent: builder.mutation({
      query: (articleData) => ({
        url: "addEvent",
        method: "POST",
        body: articleData,
      }),
      invalidatesTags: ["Events"],
    }),
    getEventStands: builder.query({
      query: (id) => ({
        url: `/getAllBlockStandsByPromotor?PromotorId=1`,
        method: "Get",
      }),
      invalidatesTags: ["Events"],
    }),
    getEventStandsById: builder.query({
      query: (id) => ({
        url: `/getRowsAndSeatsByStandId?StandId=${id}`,
        method: "Get",
      }),
      invalidatesTags: ["Events"],
    }),
    addEventTicketDetails: builder.mutation({
      query: (ticketDetail) => ({
        url: "addEventTicketsFull",
        method: "POST",
        body: ticketDetail,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/deleteEvent?EventId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEventTicket: builder.mutation({
      query: (id) => ({
        url: `/deleteTicketDetails?Id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
})

export const {
  useGetAllEventQuery,
  useAddEventMutation,
  useGetEventStandsQuery,
  useAddEventTicketDetailsMutation,
  useGetEventStandsByIdQuery,
  useDeleteEventMutation,
  useGetAllEventTicketsQuery,
  useDeleteEventTicketMutation,
} = eventApi
