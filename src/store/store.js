import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { articleApi } from "./services/Articles/article.services"
import { eventApi } from "./services/Events/event.services"
import { authApi } from "./services/auth/auth.services"
import { venuesApi } from "./services/Veneus/Veneus.services"
import { promoterApi } from "./services/Promoters/Promoters.services"
import { discountCodeApi } from "./services/DiscountCode/discountCode.services"
import { userApi } from "./services/Users/Users.services"
import { orderApi } from "./services/Order/order.services"
import { shopApi } from "./services/Shop/shop.services"
import editDataReducer from "./slices/editDataSlice"
import { seasonTicketsApi } from "./services/SeasonTicket/SeasonTicket.services"
import { scheduleReportApi } from "./services/ScheduleReport/ScheduleReport.services"
import { reportApi } from "./services/Reports/Report.services"
import { customersApi } from "./services/Customer/Customer.services"
import { dashboardApi } from "./services/Dasboard/Dasboard.services"
import { uploadApi } from "./services/UploadImage/UploadImage.services"
import { pagesApi } from "./services/Pages/Pages.services"
import { notificationApi } from "./services/Notification/Notification.services"

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [venuesApi.reducerPath]: venuesApi.reducer,
    [promoterApi.reducerPath]: promoterApi.reducer,
    [discountCodeApi.reducerPath]: discountCodeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [seasonTicketsApi.reducerPath]: seasonTicketsApi.reducer,
    [scheduleReportApi.reducerPath]: scheduleReportApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [pagesApi.reducerPath]: pagesApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    editData: editDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      articleApi.middleware,
      eventApi.middleware,
      authApi.middleware,
      venuesApi.middleware,
      promoterApi.middleware,
      discountCodeApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      shopApi.middleware,
      seasonTicketsApi.middleware,
      scheduleReportApi.middleware,
      reportApi.middleware,
      customersApi.middleware,
      dashboardApi.middleware,
      uploadApi.middleware,
      pagesApi.middleware,
      notificationApi.middleware
    ),
})
setupListeners(store.dispatch)
