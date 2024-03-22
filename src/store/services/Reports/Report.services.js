import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  // tagTypes: ["Report"],
  endpoints: (builder) => ({
    getReports: builder.query({
      query: () => {
        return {
          url: "/getReports",
          method: "GET",
        }
      },
      // providesTags: ["Report"],
    }),
    getCheckInsReport: builder.query({
      query: () => {
        return {
          url: "/getCheckInsReport",
          method: "GET",
        }
      },
      // providesTags: ["Report"],
    }),
    getRefundReport: builder.query({
      query: () => {
        return {
          url: "/getRefundReport",
          method: "GET",
        }
      },
      // providesTags: ["Report"],
    }),
    getTicketTypeCountRepor: builder.query({
      query: () => {
        return {
          url: "/getTicketTypeCountReport",
          method: "GET",
        }
      },
      // providesTags: ["Report"],
    }),
  }),
})

export const {
  useGetReportsQuery,
  useGetCheckInsReportQuery,
  useGetRefundReportQuery,
  useGetTicketTypeCountReporQuery
} = reportApi
