import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const pagesApi = createApi({
  reducerPath: "pagesApi",
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
    getAllPages: builder.query({
      query: () => {
        return {
          url: "/getpagebypromotor",
          method: "GET",
        }
      },
      providesTags: ["Pages"],
    }),
    addEventUsers: builder.mutation({
      query: (venueData) => ({
        url: "/addEventUser",
        method: "POST",
        body: venueData,
      }),
      invalidatesTags: ["Pages"],
    }),
    editHomePageHeader: builder.mutation({
      query: (homePageHeader) => ({
        url: "/updateHomePageHeader",
        method: "PUT",
        body: homePageHeader,
      }),
      invalidatesTags: ["Pages"],
    }),
    editHomePage: builder.mutation({
      query: (homePage) => ({
        url: "/updatepage",
        method: "PUT",
        body: homePage,
      }),
      invalidatesTags: ["Pages"],
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
      invalidatesTags: ["Pages"],
    }),
    getPageHeader: builder.query({
      query: (id) => {
        return {
          url: `/getHomePageHeaderbypromotor`,
          method: "GET",
        }
      },
      providesTags: ["Pages"],
    }),
  }),
})

export const {
  useAddEventUsersMutation,
  useGetAllPagesQuery,
  useDeleteEventUserMutation,
  useEditEventUserMutation,
  useGetPageHeaderQuery,
  useEditHomePageHeaderMutation,
  useEditHomePageMutation,
} = pagesApi
