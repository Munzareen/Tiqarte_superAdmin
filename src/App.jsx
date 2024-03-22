import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Events } from "./components/Modules/Events/Event/Events";
import { Dashboard } from "./components/Modules/Dashboard/Dashboard";
import { Articles } from "./components/Modules/Articles/Articles";
import { TicketOrders } from "./components/Modules/TicketOrders/TicketOrders";
import { Season } from "./components/Modules/SeasonTickets/SeasonTickets";
import { Page } from "./components/Modules/Page/Page";
import { Shop } from "./components/Modules/Shop/Shop";
import { Promoters } from "./components/Modules/Promoters/Promoters";
import { DiscountCodes } from "./components/Modules/DiscountCodes/DiscountCodes";
import { Reports } from "./components/Modules/Reports/Reports";
import { ScheduledReports } from "./components/Modules/ScheduledReports/ScheduledReports";
import { Users } from "./components/Modules/Users/Users";
import { CreateEvent } from "./components/Modules/Events/Event/CreateEvent/CreateEvent";
import { PrintTicket } from "./components/Modules/TicketOrders/PrintTicket/PrintTicket";
import { Customers } from "./components/Modules/Customers/Customers";
import { CreateCustomers } from "./components/Modules/Customers/CreateCustomer/CreateCustomers";
import { EditCustomerDetail } from "./components/Modules/Customers/EditCustomerDetail/EditCustomerDetail";
import { AddProduct } from "./components/Modules/Shop/AddProduct/AddProduct";
import { CreateArticle } from "./components/Modules/Articles/CreateArticle/CreateArticle";
import { CreateDiscountCode } from "./components/Modules/DiscountCodes/CreateDiscountCode/CreateDiscountCode";
import { CreatePromoters } from "./components/Modules/Promoters/CreatePromoters/CreatePromoters";
import { CreateUser } from "./components/Modules/Users/CreateUser/CreateUser";
import { CreateSeasonTicket } from "./components/Modules/SeasonTickets/CreateSeasonTicket/CreateSeasonTicket";
import { CreateScheduleReport } from "./components/Modules/ScheduledReports/CreateScheduleReport/CreateScheduleReport";
import ProtectedRoute from "../routes/ProtectedRoute";
import Cookies from "js-cookie";
import { Venues } from "./components/Modules/Venues/Venues";
import { CreateVenue } from "./components/Modules/Venues/CreateVenue/CreateVenue";
import { CheckInsTable } from "./components/Modules/Reports/CheckInsTable/CheckInsTable";
import { Refunds } from "./components/Modules/Reports/RefundsTable/RefundsTable";
import { TicketCountByTypeTable } from "./components/Modules/Reports/TicketCountByTypeTable/TicketCountByTypeTable";
import { Notification } from "./components/Modules/Notification/Notification";
import { CreateNotification } from "./components/Modules/Notification/CreateNotification/CreateNotification";
import { AddUserGroup } from "./components/Modules/Notification/AddUserGroup/AddUserGroup";
import { CreateNewTemplate } from "./components/Modules/Notification/CreateNewTemplate/CreateNewTemplate";
import { EditHomePage } from "./components/Modules/Page/EditHomePage/EditHomePage";
import { EditEventPage } from "./components/Modules/Page/EditEventPage/EditEventPage";
import { EditNewsPage } from "./components/Modules/Page/EditNewsPage/EditNewsPage";
import { EditBookingPage } from "./components/Modules/Page/EditBookingPage/EditBookingPage";
import { EditShopsPage } from "./components/Modules/Page/EditShopsPage/EditShopsPage";
import { EditFAQsPage } from "./components/Modules/Page/EditFAQsPage/EditFAQsPage";
import { EditPrivacyPolicyPage } from "./components/Modules/Page/EditPrivacyPolicyPage/EditPrivacyPolicyPage";
import { EditRefundAndCancellationPage } from "./components/Modules/Page/EditRefundAndCancellationPage/EditRefundAndCancellationPage";
import { EditTermsAndConditionsPage } from "./components/Modules/Page/EditTermsAndConditionsPage/EditTermsAndConditionsPage";
import { EditDeliveryPolicyPage } from "./components/Modules/Page/EditDeliveryPolicyPage/EditDeliveryPolicyPage";
import { Ticket } from "./components/Modules/Events/Ticket/Ticket";
import { CreateTicketForEvent } from "./components/Modules/Events/Ticket/CreateTicketForEvent/CreateTicketForEvent";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="events" element={<Events />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/ticket" element={<Ticket />} />
        <Route
          path="events/create-event-ticket"
          element={<CreateTicketForEvent />}
        />
        <Route path="articles" element={<Articles />} />
        <Route path="articles/create-article" element={<CreateArticle />} />
        <Route path="order" element={<TicketOrders />} />
        <Route path="order/orderdetails" element={<PrintTicket />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/edit/:id" element={<EditCustomerDetail />} />
        <Route path="customers/create-customer" element={<CreateCustomers />} />
        <Route path="seasons" element={<Season />} />
        <Route path="seasons/create-season" element={<CreateSeasonTicket />} />
        <Route path="pages" element={<Page />} />
        <Route path="pages/EditHomePage" element={<EditHomePage />} />
        <Route path="pages/EditEventsPage" element={<EditEventPage />} />
        <Route path="pages/EditNewsPage" element={<EditNewsPage />} />
        <Route path="pages/EditBookingPage" element={<EditBookingPage />} />
        <Route path="pages/EditShopsPage" element={<EditShopsPage />} />
        <Route path="pages/EditFAQsPage" element={<EditFAQsPage />} />
        <Route
          path="pages/EditPrivacyPolicyPage"
          element={<EditPrivacyPolicyPage />}
        />
        <Route
          path="pages/EditRefundAndCancellationPage"
          element={<EditRefundAndCancellationPage />}
        />
        <Route
          path="pages/EditTermsAndConditionsPage"
          element={<EditTermsAndConditionsPage />}
        />
        <Route
          path="pages/EditDeliveryPolicyPage"
          element={<EditDeliveryPolicyPage />}
        />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/add-product" element={<AddProduct />} />
        <Route path="promoters" element={<Promoters />} />
        <Route path="promoters/create-promoter" element={<CreatePromoters />} />
        <Route path="discount" element={<DiscountCodes />} />
        <Route
          path="discount/create-discount-code"
          element={<CreateDiscountCode />}
        />
        <Route path="reports" element={<Reports />} />
        <Route path="check-ins" element={<CheckInsTable />} />
        <Route path="refunds" element={<Refunds />} />
        <Route
          path="ticket-Count-by-type"
          element={<TicketCountByTypeTable />}
        />
        <Route path="scheduled" element={<ScheduledReports />} />
        <Route
          path="scheduled/create-schedule"
          element={<CreateScheduleReport />}
        />
        <Route path="users" element={<Users />} />
        <Route path="user/create-user" element={<CreateUser />} />
        <Route path="venues" element={<Venues />} />
        <Route path="venues/create-venue" element={<CreateVenue />} />
        <Route path="notification" element={<Notification />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="/notification/create-notification"
          element={<CreateNotification />}
        />
        <Route
          path="/notification/create-user-group"
          element={<AddUserGroup />}
        />
        <Route
          path="/notification/create-new-template"
          element={<CreateNewTemplate />}
        />

        <Route path="/" element={<Layout />} />
      </Route>
      {/* //CreateNotification */}
      {/* </Route> */}
      {/* <Route exact path='/event' component={<Layout />} /> */}
    </Routes>
  );
}

export default App;
