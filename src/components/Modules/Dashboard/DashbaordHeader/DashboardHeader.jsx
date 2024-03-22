import { Box, Grid, Button as MuiButton, Typography } from "@mui/material"
import React, { useState } from "react"
import { CustomSelect } from "../../../Common/CustomSelect"
import InputDateAndTimePicker from "../../../Common/InputDateAndTimePicker"
import { DateField } from "@mui/x-date-pickers"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import dayjs from "dayjs"
import { DateRange } from "react-date-range"
import { addDays, subDays, format } from "date-fns"



export const DashboardHeader = ({
  getDashboardTilesData,
  open,
  handleClickOpen,
  handleClose,
  setFormData,
  formData,
  eventTypes,
  events, setEvents
}) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [selectedButton, setSelectedButton] = useState("24H")
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection"
    }
  ])

  const handleSelect = (ranges) => {
    const { selection } = ranges;
    setSelectionRange([selection])
    const formattedStartDate = format(ranges.selection.startDate, 'yyyy-MM-dd')
    const formattedEndDate = format(ranges.selection.endDate, 'yyyy-MM-dd')
    setStartDate(formattedStartDate)
    setEndDate(formattedEndDate)
  };

  // console.log(endDate)
  const handleChangeEvent = (event) => {
    setEvents(event.target.value)
  }

  const handleDateRangeButtonClick = (range) => {
    const today = dayjs()
    let newEndDate = today
    let newStartDate

    if (range === "24H") {
      newStartDate = today.subtract(1, "day")
    } else if (range === "7D") {
      newStartDate = today.subtract(7, "day")
    } else if (range === "1M") {
      newStartDate = today.subtract(1, "month")
    } else if (range === "6M") {
      newStartDate = today.subtract(6, "month")
    } else if (range === "1Y") {
      newStartDate = today.subtract(1, "year")
    }
    setStartDate(newStartDate)
    setEndDate(newEndDate)
    const formattedStartDate = newStartDate.format("YYYY-MM-DD")
    const formattedEndDate = newEndDate.format("YYYY-MM-DD")
    setFormData({
      ...formData,
      dateFrom: formattedStartDate,
      dateTo: formattedEndDate,
    })
    setSelectedButton(range)
  }
  const handleConfirmClick = () => {
    // Here, you can update the formData with the selected date
    // For example, you can set formData.dateFrom and formData.dateTo based on startDate and endDate

    setFormData({
      ...formData,
      dateFrom: startDate ? startDate : formData.dateFrom,
      dateTo: endDate ? endDate : formData.dateTo,
    })

    // Close the dialog
    handleClose()
  }
  return (
    <Box sx={{ mt: "20px" }}>
      <Grid container  >
        <Grid item xs={12}  lg={6}>
          <CustomSelect
            sx={{ width: "144px" }}
            handleChange={handleChangeEvent}
            label={"All events"}
            value={events}
            data={eventTypes}
          />
        </Grid>
        <Grid item xs={12}   lg={6}>
          <Box sx={{ display: "flex", justifyContent:"space-between", flexWrap:"wrap" }}>
            <DashBoardHeaderButton
              buttonName={"24H"}
              sx={{
                width: "6px",
                bgcolor: selectedButton === "24H" ? "#2460B8" : "white", // Apply blue background when selected
                color: selectedButton === "24H" ? "white" : "#969BA0",
              }}
              onClick={() => handleDateRangeButtonClick("24H")}
            />
            <DashBoardHeaderButton
              buttonName={"7D"}
              sx={{
                bgcolor: selectedButton === "7D" ? "#2460B8" : "white",
                color: selectedButton === "7D" ? "white" : "#969BA0",
              }}
              onClick={() => handleDateRangeButtonClick("7D")}
            />
            <DashBoardHeaderButton
              buttonName={"1M"}
              sx={{
                bgcolor: selectedButton === "1M" ? "#2460B8" : "white",
                color: selectedButton === "1M" ? "white" : "#969BA0",
              }}
              onClick={() => handleDateRangeButtonClick("1M")}
            />
            <DashBoardHeaderButton
              buttonName={"6M"}
              sx={{
                bgcolor: selectedButton === "6M" ? "#2460B8" : "white",
                color: selectedButton === "6M" ? "white" : "#969BA0",
              }}
              onClick={() => handleDateRangeButtonClick("6M")}
            />
            <DashBoardHeaderButton
              buttonName={"1Y"}
              sx={{
                bgcolor: selectedButton === "1Y" ? "#2460B8" : "white",
                color: selectedButton === "1Y" ? "white" : "#969BA0",
              }}
              onClick={() => handleDateRangeButtonClick("1Y")}
            />

            <div>
              <MuiButton
                onClick={handleClickOpen}
                startIcon={<Box component='img' src='/calenderIcon.png' />}
                sx={{
                  color: "#969BA0",
                  borderColor: "#F0F0F0",
                  // width: "100%",
                  height: "56px",
                  fontSize: "16px",
                  fontWeight: 400,
                  bgcolor: "white",
                  textTransform: "capitalize",
                  borderRadius: "16px",
                  ml: "8px",
                  "&.MuiButton-root:hover": {
                    borderColor: "#F0F0F0",
                    bgcolor: "white",
                  },
                }}
              >
                choose date
              </MuiButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
                maxWidth="lg"
              >
                <DialogContent>
                <DateRange
                 showSelectionPreview={true}
                 moveRangeOnFirstSelection={false}
                 months={2}
                 
                 direction="horizontal"
                 dateDisplayFormat={"MMM d, yyyy"}
                 ranges={selectionRange}
                 onChange={handleSelect}
                  />
                </DialogContent>
                {/* <DialogContent>
                  <InputDateAndTimePicker
                    field='DateField'
                    React
                    fieldType={
                      <DateField
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "48px",
                            width: "517px",
                            borderRadius: "16px",
                            bgcolor: "white",
                            overflow: "hidden",
                            color: "#707070",
                            mb: "1rem",
                            "& .MuiTypography-root": {
                              color: "red",
                              fontSize: "14px",
                            },
                          },
                        }}
                        // value={formData.dateFrom}
                        format='YYYY-MM-DD'
                        onChange={(date) => setStartDate(dayjs(date))}
                      />
                    }
                    label={"Start date"}
                  />
                  <InputDateAndTimePicker
                    field='DateField'
                    React
                    fieldType={
                      <DateField
                        sx={{
                          "& .MuiInputBase-root": {
                            height: "48px",
                            width: "517px",

                            borderRadius: "16px",
                            bgcolor: "white",
                            overflow: "hidden",
                            color: "#707070",

                            "& .MuiTypography-root": {
                              color: "red",
                              fontSize: "14px",
                            },
                          },
                        }}
                        // value={formData.dateFrom}
                        format='YYYY-MM-DD'
                        onChange={(date) => setEndDate(dayjs(date))}
                      />
                    }
                    label={"End date"}
                  />
                </DialogContent> */}
                <DialogActions>
                  <Button onClick={() => handleConfirmClick()}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={3}
        sx={
          {
            // gap:"12px"
            // display: "flex",
            // justifyContent: "space-between",
            // flexWrap: "wrap",
            // columnGap:"12px"
          }
        }
      >
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Revenue"}
            statValue={`$ ${getDashboardTilesData?.Revenue}`}
            img='/revenue.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Booking fee"}
            statValue={`$ ${getDashboardTilesData?.BookingFee}`}
            img='/booking-fee.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Refunds"}
            statValue={`$ ${getDashboardTilesData?.Refunds}`}
            img='/refunds.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Ticket sales"}
            statValue={`$ ${getDashboardTilesData?.TicketSales}`}
            img='/ticket-blue.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Orders"}
            statValue={`$ ${getDashboardTilesData?.Orders}`}
            img='/orders.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Tickets sold"}
            statValue={`$ ${getDashboardTilesData?.TicketsSold}`}
            img='/ticket-blue.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Customers"}
            statValue={`${getDashboardTilesData?.Customers}`}
            img='/users-blue.png'
          />
        </Grid>
        <Grid item xs={6} md={4} lg={3}>
          <StatsCard
            statName={"Shop sales"}
            statValue={`${getDashboardTilesData?.ShopSales}`}
            img='/cart.png'
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export const DashBoardHeaderButton = ({
  sx,
  buttonName,
  startIcon,
  onClick,
}) => {
  return (
    <MuiButton
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        color: "#969BA0",
        borderColor: "#F0F0F0",
        // width: "56px",
        height: "56px",
        fontSize: "16px",
        fontWeight: 400,
        bgcolor: "white",
        textTransform: "capitalize",
        borderRadius: "16px",
        ml: "8px",
        "&.MuiButton-root:hover": {
          borderColor: "white",
          bgcolor: "#2460B8",
          color: "white",
        },
        ...sx,
      }}
    >
      {buttonName}
    </MuiButton>
  )
}

export const StatsCard = ({ img, statName, statValue }) => {
  return (
    <Box
      sx={{
        py: "20px",
        bgcolor: "white",
        width: "100%",
        borderRadius: "16px",
        mt: "32px",
        // height:"100%",
        px: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            bgcolor: "#F0F4FA",
            borderRadius: "16px",

            width: { xs: "48px", sm: "56px" },
            height: { xs: "48px", sm: "56px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Box
              component='img'
              src={img}
              sx={{
                height: { xs: "18px", sm: "27px" },
                width: { xs: "18px", sm: "20px" },
              }}
            />
          </Box>
        </Box>
        <Box sx={{ ml: { xs: "8px", md: "16px" } }}>
          <Typography
            sx={{ fontSize: { xs: "12px", sm: "14px" }, fontWeight: 500 }}
          >
            {statName}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "22px" },
              fontWeight: 600,
              mt: "4px",
            }}
          >
            {statValue}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
