import React, { useEffect, useState } from "react";
import { DashboardHeader } from "./DashbaordHeader/DashboardHeader";
import { PopularEvents } from "./PopularEvents/PopularEvents";
import { Box, Container, Grid, Typography } from "@mui/material";
import SimpleRadialBarChart from "./RadialGraph/RadialGraph";
import { AreaGraphs } from "./AreaChart/AreaChart";
import {
  useGetCustomersDashboardQuery,
  useGetPopularEventsDashboardQuery,
  useGetdashboardTilesQuery,
} from "../../../store/services/Dasboard/Dasboard.services";
import { useAuthRedirect } from "../../Common/authRedirect";
import { Loader } from "../../Common/Loader/Loader";
import dayjs from "dayjs";
import RadialChartSingle from "./RadialChartSingle/RadialChartSingle";
import Cookies from "js-cookie";

export const Dashboard = () => {
  const accessToken = Cookies.get("access_token");
  const [open, setOpen] = useState(false);
  const [eventTypes, setEventTypes] = useState([]);
  const [events, setEvents] = useState("");

  const [formData, setFormData] = useState({
    dateFrom: dayjs().format("YYYY-MM-DD"), // Default to current date
    dateTo: dayjs().format("YYYY-MM-DD"),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: getDashboardTilesData,
    isLoading: isTilesLoading,
    error,
  } = useGetdashboardTilesQuery({ formData, events });
  const { data: getCustomersDashboardData, isLoading: isCustomerLoading } =
    useGetCustomersDashboardQuery({ formData, events });
  const { data: getPopularEventsDashboard, isLoading: isPopularEventsLoading } =
    useGetPopularEventsDashboardQuery({ formData, events });
  useEffect(() => {
    // The query hook will automatically refetch when formData changes
  }, [formData, events]);

  useEffect(() => {
    // Define the URL of the API
    const apiUrl = "https://tiqarte.azurewebsites.net/api/getEventTypes";
    const token = accessToken;
    // Fetch data from the API
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setEventTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useAuthRedirect(error);
  if (isTilesLoading && isCustomerLoading && isPopularEventsLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Loader />
      </Box>
    );
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1440px",
        },
      }}
    >
      <DashboardHeader
        eventTypes={eventTypes}
        getDashboardTilesData={getDashboardTilesData}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        setFormData={setFormData}
        formData={formData}
        events={events}
        setEvents={setEvents}
      />
      <Box
        sx={{ mt: "32px", bgcolor: "white", borderRadius: "1rem", py: "1rem" }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", px: "2rem" }}
        >
          <Typography
            sx={{ color: "#404040", fontSize: "22px", fontWeight: 600 }}
          >
            Revenue
          </Typography>
          <Typography
            sx={{
              color: "#969BA0",
              fontSize: "14px",
              fontWeight: 500,
              mr: "1.8rem",
            }}
          >
            From {formData?.dateFrom} to {formData?.dateTo}
          </Typography>
        </Box>
        <AreaGraphs startDate={formData?.dateFrom} endDate={formData?.dateTo} />
      </Box>
      <Grid container columnSpacing={3} sx={{ mt: "22px" }}>
        {/* <Box sx={{ display: "flex",  }}> */}
        <Grid item xs={12} md={6}>
          <PopularEvents
            getPopularEventsDashboard={getPopularEventsDashboard}
            formData={formData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: "16px",
              mt: "32px",
              // ml: "32px",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: "24px",
                mb: "38px",
              }}
            >
              <Typography
                sx={{
                  color: "#404040",
                  fontSize: "22px",
                  fontWeight: 600,
                  ml: "24px",
                }}
              >
                Customers
              </Typography>
              <Typography
                sx={{
                  color: "#969BA0",
                  fontSize: "14px",
                  fontWeight: 500,
                  mr: "24px",
                }}
              >
                From {formData.dateFrom} to {formData.dateTo}{" "}
              </Typography>
            </Box>
            <SimpleRadialBarChart
              formData={formData}
              getCustomersDashboardData={getCustomersDashboardData}
            />
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {/* <Grid container  >
              <Grid item md={6}>
                <RadialChartSingle />
              </Grid>
              <Grid item md={6}>
                <RadialChartSingle />
              </Grid>
              <Grid item md={12}>
                <RadialChartSingle />
              </Grid>
            </Grid> */}
              <RadialChartSingle
                name={"Adult(18-64)"}
                value={getCustomersDashboardData?.Male}
              />
              <RadialChartSingle
                name={"Senior(above65)"}
                value={getCustomersDashboardData?.Female}
              />
              <RadialChartSingle
                name={"Child(3-17)"}
                value={getCustomersDashboardData?.Child}
              />
            </Box>
          </Box>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Container>
  );
};
