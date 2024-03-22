import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => {
        return {
          url: "api/getAllProductList?PromotorId=0",
          method: "GET",
        }
      },
      providesTags: ["Shop"],
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "api/addProduct",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Shop"],
    }),
    editProduct: builder.mutation({
      query: (productData) => ({
        url: "/api/editproduct",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Shop"],
    }),
    deleteproduct: builder.mutation({
      query: (id) => {
        return {
          url: `api/deleteproduct?productId=${id}`,
          method: "POST",
          // body: venueData,
        }
      },

      invalidatesTags: ["Shop"],
    }),
    //
  }),
})

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useDeleteproductMutation,
  useEditProductMutation,
} = shopApi
