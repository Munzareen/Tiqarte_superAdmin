import React, { useEffect, useState } from "react"
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Container,
} from "@mui/material"

// import "../css/index.css"
import { useNavigate } from "react-router-dom"
import {
  useAddEventMutation,
  useAddEventTicketDetailsMutation,
} from "../../../../../store/services/Events/event.services"
import { Initials } from "./Initials/Initials"
import { TicketDetails } from "./TicketDetails/TicketDetails"
import { SeatedTicket } from "./SeatedTicket/SeatedTicket"
import { PasswordProtection } from "./PasswordProtection/PasswordProtection"
const steps = [
  "Initials",
  "Ticket details",
  "Seated ticket ",
  "Password Protection",
]
const stepsHeader = [
  "Enter the details below ",
  "Enter the details of ticket 1",
  "Seated tickets",
  "Enter the details below",
]

function getStepContent(
  step,
  handleNext,
  handleBack,
  setInitials,
  setTicketDetails,
  setSeatedTickets,
  seatedTickets,
  setPasswordProtection
) {
  switch (step) {
    case 0:
      return (
        // <EventDetails handleNext={handleNext} setEventDetail={setEventDetail} />
        <Initials
          handleNext={handleNext}
          // handleBack={handleBack}
          setInitials={setInitials}
        />
      )
    case 1:
      return (
        <TicketDetails
          handleNext={handleNext}
          // handleBack={handleBack}
          setTicketDetails={setTicketDetails}
        />
      )
    case 2:
      return (
        <SeatedTicket
          handleNext={handleNext}
          // handleBack={handleBack}
          setSeatedTickets={setSeatedTickets}
          seatedTickets={seatedTickets}
        />
      )
    case 3:
      return (
        <PasswordProtection
          handleNext={handleNext}
          // handleBack={handleBack}
          setPasswordProtection={setPasswordProtection}
          // handleSubmit={handleSubmit}
        />
      )
    default:
      return null
  }
}

export const CreateTicketForEvent = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [initials, setInitials] = useState({})
  const [ticketDetails, setTicketDetails] = useState({})
  const [seatedTickets, setSeatedTickets] = useState([])
  const [passwordProtection, setPasswordProtection] = useState({})
  const [
    addEventTicketDetails,
    { isLoading, isError, isSuccess, status, data },
  ] = useAddEventTicketDetailsMutation()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  console.log("seatedTickets", seatedTickets)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      TicketInitials: {
        Date: initials.dateFrom,
        Time: initials.timeFrom,
        EventRunTime: initials.eventRunTimeInMins,
        DisplayEventTime: initials.displayEventTimeOnEventSection,
        Location: initials.location,
        ManagementFeeType: initials.managementFeeInPercentageOrAmount,
        Amount: initials.percentageOrAmount,
        Add1EuroBookingFeeUnder10: initials.addBookingFree,
        Copy: initials.copy,
        OverrideCapacityScheduleSoldOut:
          initials.OverrideCapacityScheduleSoldOut,
        MinimumAge: initials.minimumAge,
        ProductURL: initials.productURL,
        isItBuyable: initials.isItBuyable,
        PromotorId: initials.promoter,
        MarkAsSold: initials.markedAsSold,
        Venue: initials.venue,
      },
      TicketDetails: {
        EventId: 1,
        TicketType: ticketDetails.type,
        TicketPrice: ticketDetails.ticketPrice,
        BookingFee: ticketDetails.bookingFee,
        AvailableTickets: ticketDetails.availableTickets,
        SeasonTicketId: 2,
        AttendeeAge: ticketDetails.attendeeAgeType,
        HideFromFrontend: ticketDetails.hideFromFrontEnd,
        ExcludeFromOverallCapacity: ticketDetails.excludeFromOverAllCapacity,
        MaximumTickets: ticketDetails.maximumtickets,
        MinimumTickets: ticketDetails.minimumTickets,
        UnitCost: ticketDetails.unitCost,
        RequiredTicketHolderDetails: ticketDetails.requestTicketsHolderDetails,
        TicketDescription: ticketDetails.ticketDes,
        DocumentURL: ticketDetails.ticketDes,
        AcknowledgementURL: ticketDetails.acknowledgements,
        MetaDataURL: ticketDetails.metadata,
      },
      StandardSeatTicketRequest: {
        EventTicketId: 0,
        StadiumId: 1,
        BlockStandId: seatedTickets[0].BlockStandId,
        RowsId: seatedTickets[0].RowsId,
        SeatId: seatedTickets[0].SeatId,
      },
      TicketPasswordProtectionRequest: {
        EventTicketsId: 0,
        Password: passwordProtection.password,
        isEnablePasswordProtection: passwordProtection.enablePasswordProtection,
        AutoGeneratedLink: passwordProtection.autoGeneratedUrk,
        Visibility: passwordProtection.visibility,
        Slug: passwordProtection.slug,
        URL: passwordProtection.Url,
        isActive: true,
        CreatedDate: "2023-09-22T22:44:22.455Z",
      },
    }
    addEventTicketDetails(data)
  }

  useEffect(() => {
    if (isSuccess) navigate("/events/ticket")
  }, [isSuccess, navigate])
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Container
      sx={{
        "&.MuiContainer-root": {
          p: 0,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "70%" },
            mx: { sm: "auto" },
            mt: "30px",
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              "& .MuiStepLabel-label": {
                mt: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#404040",
              },
              "& .MuiStepIcon-root.Mui-active": {
                color: " #2460B8",
              },
              "& .MuiStepIcon-root.Mui-completed": {
                color: " #2460B8",
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }} variant='h6'>
              Thank you for submitting the form.
            </Typography>
            <Button type='submit' onClick={handleSubmit}>
              Submit
            </Button>
          </>
        ) : (
          <>
            <Typography
              sx={{
                color: "#202020",
                fontWeight: 500,
                fontSize: "22px",
                mt: "50px",
              }}
            >
              {stepsHeader[activeStep]}
            </Typography>
            <Box sx={{ mb: 2 }}>
              {getStepContent(
                activeStep,
                handleNext,
                handleBack,
                setInitials,
                setTicketDetails,
                setSeatedTickets,
                seatedTickets,
                setPasswordProtection
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  )
}
