import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tiqarte.azurewebsites.net/admin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("access_token")
      headers.set("Authorization", `Bearer ${accessToken}`)
      return headers
    },
  }),
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getAllUserGroups: builder.query({
      query: () => {
        return {
          url: "/getusergroupbypromotor",
          method: "GET",
        }
      },
      providesTags: ["Notification"],
    }),
    getAllNotification: builder.query({
      query: () => {
        return {
          url: "/getnotificationbypromotor",
          method: "GET",
        }
      },
      providesTags: ["Notification"],
    }),
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: "/createnotification",
        method: "POST",
        body: notificationData,
      }),
      invalidatesTags: ["Notification"],
    }),
    createUserGroup: builder.mutation({
      query: (userGroupData) => ({
        url: "/createusergroup",
        method: "POST",
        body: userGroupData,
      }),
      invalidatesTags: ["Notification"],
    }),
    createTemplate: builder.mutation({
      query: (templateData) => ({
        url: "/createtemplate",
        method: "POST",
        body: templateData,
      }),
      invalidatesTags: ["Notification"],
    }),
    editUserGroup: builder.mutation({
      query: (editUserGroupData) => ({
        url: "/updateusergroup",
        method: "PUT",
        body: editUserGroupData,
      }),
      invalidatesTags: ["Notification"],
    }),
    deleteUserGroup: builder.mutation({
      query: (id) => {
        return {
          url: `/deleteusergroup?Id=${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["Notification"],
    }),
  }),
})

export const {
  useCreateNotificationMutation,
  useCreateUserGroupMutation,
  useGetAllUserGroupsQuery,
  useDeleteUserGroupMutation,
  useGetAllNotificationQuery,
} = notificationApi
