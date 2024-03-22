import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  //   tagTypes: ["Venues"],
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (upload) => {
        return {
          url: `/uploadEventImages`,
          method: "POST",
          body: upload,
        }
      },
      //   invalidatesTags: ["Venues"],
    }),
  }),
})

export const { useUploadImageMutation } = uploadApi
