import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllEventUsers: builder.query({
      query: () => {
        return {
          url: "/getAllEventUser",
          method: "GET",
        }
      },
      providesTags: ["Users"],
    }),
    addEventUsers: builder.mutation({
      query: (venueData) => ({
        url: "/addEventUser",
        method: "POST",
        body: venueData,
      }),
      invalidatesTags: ["Users"],
    }),
    editEventUser: builder.mutation({
      query: (venueData) => ({
        url: "/editEventUser",
        method: "PUT",
        body: venueData,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteEventUser: builder.mutation({
      query: (id) => {
        // console.log(id)
        return {
          url: `/deleteEventUser?Id=${id}`,
          method: "DELETE",
          // body: venueData,
        }
      },
      invalidatesTags: ["Users"],
    }),
  }),
})

export const {
  useAddEventUsersMutation,
  useGetAllEventUsersQuery,
  useDeleteEventUserMutation,
  useEditEventUserMutation,
} = userApi
