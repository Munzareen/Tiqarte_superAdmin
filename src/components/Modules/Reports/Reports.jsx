import { Box, Container, Grid } from "@mui/material"
import React from "react"
import { useGetReportsQuery } from "../../../store/services/Reports/Report.services"
import { useAuthRedirect } from "../../Common/authRedirect"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../Common/Loader/Loader"
const reportIcons = {
  "Check-Ins": "/reportCheck-Ins.png",
  "Marketing Options": "/reportMarketingOptions.png",
  "Recent Orders": "/reportRecentOrders.png",
  Refunds: "/reportRefunds.png",
  "Ticket Count By Type": "/reportCalculator.png",
  Tickets: "/reportTicketIcon.png",
}
export const Reports = () => {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetReportsQuery()

  useAuthRedirect(error)
  if (isLoading)
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
    )
  if (data?.length === 0) return <p>No Data found</p>
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Grid container columnSpacing={4}>
        {data?.map((item, index) => {
          const iconName = reportIcons[item.ReportName]
          return (
            <Grid
              key={item.Id}
              item
              xs={12}
              sm={6}
              lg={4}
              onClick={() => navigate(`/${item.ReportName.replace(/ /g, "-")}`)}
              sx={{ mt: "32px" }}
            >
              <ReportsCard name={item.ReportName} icon={iconName} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}
const ReportsCard = ({ name, icon }) => {
  return (
    <Box
      sx={{
        boxShadow: " 0px 0px 4px 0px rgba(240, 240, 240, 0.40)",
        borderRadius: "16px",
        bgcolor: "white",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "24px",
          py: "16px",
        }}
      >
        <Box component='img' src={icon} />
        <Box>{name}</Box>
        <Box component='img' src='/reportArrow.png' />
      </Box>
    </Box>
  )
}
