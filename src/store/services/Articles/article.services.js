import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin/",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    getAllArticle: builder.query({
      query: (token) => {
        return {
          url: "/getAllArticleByPromotor?PromotorId=1",
          method: "GET",
        }
      },
      providesTags: ["Articles"],
    }),
    addArticle: builder.mutation({
      query: (articleData, token) => {
        return {
          url: "/addArticle",
          method: "POST",
          body: articleData,
        }
      },
      invalidatesTags: ["Articles"],
    }),
    editArticle: builder.mutation({
      query: (data) => ({
        url: "/editArticle",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => {
        // console.log(id)
        return {
          url: `/deleteArticle?ArticleId=${id}`,
          method: "DELETE",
          // body: venueData,
        }
      },
      invalidatesTags: ["Articles"],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllArticleQuery,
  useAddArticleMutation,
  useDeleteArticleMutation,
  useEditArticleMutation,
} = articleApi
