import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const venuesApi = createApi({
  reducerPath: "venuesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Venues"],
  endpoints: (builder) => ({
    getAllEventVenue: builder.query({
      query: () => {
        return {
          url: "/getAllEventVenue",
          method: "GET",
        }
      },
      providesTags: ["Venues"],
    }),
    addEventVenue: builder.mutation({
      query: (venueData) => ({
        url: "/addEventVenue",
        method: "POST",
        body: venueData,
      }),
      invalidatesTags: ["Venues"],
    }),
    deleteEventVenue: builder.mutation({
      query: (id) => {
        // console.log(id)
        return {
          url: `/deleteEventVenue?Id=${id}`,
          method: "DELETE",
          // body: venueData,
        }
      },
      invalidatesTags: ["Venues"],
    }),
    editEventVenue: builder.mutation({
      query: (venueData) => {
        return {
          url: `/editEventVenue`,
          method: "PUT",
          body: venueData,
        }
      },
      invalidatesTags: ["Venues"],
    }),
  }),
})

export const {
  useAddEventVenueMutation,
  useGetAllEventVenueQuery,
  useDeleteEventVenueMutation,
  useEditEventVenueMutation
} = venuesApi
