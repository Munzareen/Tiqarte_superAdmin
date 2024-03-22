import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const scheduleReportApi = createApi({
  reducerPath: "scheduleReportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["ScheduleReport"],
  endpoints: (builder) => ({
    getAllScheduleReports: builder.query({
      query: () => {
        return {
          url: "/getscheduledreports",
          method: "GET",
        }
      },
      providesTags: ["ScheduleReport"],
    }),
    addScheduledReport: builder.mutation({
      query: (data) => ({
        url: "/createscheduledreport",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ScheduleReport"],
    }),

    editScheduledReport: builder.mutation({
      query: (data) => {
        return {
          url: `/updatescheduledreport`,
          method: "PUT",
          body: data,
        }
      },
      invalidatesTags: ["ScheduleReport"],
    }),

    deleteScheduledReport: builder.mutation({
      query: (id) => ({
        url: `/deletescheduledreport?Id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ScheduleReport"],
    }),
  }),
})

export const {
  useAddScheduledReportMutation,
  useGetAllScheduleReportsQuery,
  useDeleteScheduledReportMutation,
  useEditScheduledReportMutation,
} = scheduleReportApi
