import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
    getdashboardTiles: builder.query({
      query: ({formData,events}) => {
        return {
          url: `/getdashboardTilesDashboard?startDate=${formData.dateFrom}&endDate=${formData.dateTo}&EventId=${events??''}`,
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
    getPopularEventsDashboard: builder.query({
      query: ({formData,events}) => {
        return {
          url: `/getPopularEventsDashboard?startDate=${formData.dateFrom}&endDate=${formData.dateTo}&EventId=${events??''}`,
          method: "GET",
        }
      },
      // providesTags: ["Report"],
    }),
    getCustomersDashboard: builder.query({
      query: ({formData,events}) => {
        return {
          url: `/getCustomersDashboard?startDate=${formData.dateFrom}&endDate=${formData.dateTo}&EventId=${events??''}`,
          method: "GET",
        }
      },
      // providesTags: ["Report"],
    }),
  }),
})

export const {
  useGetdashboardTilesQuery,
  useGetCustomersDashboardQuery,
  useGetPopularEventsDashboardQuery,
} = dashboardApi
