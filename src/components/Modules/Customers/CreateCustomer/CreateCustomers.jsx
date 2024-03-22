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
import { useNavigate } from "react-router-dom"
import { BillingAddress } from "../BillingAddress/BillingAddress"
import { Details } from "../Details/Details"
import { useCreateCustomerMutation } from "../../../../store/services/Customer/Customer.services"
import { Notes } from "../Notes/Notes"
const steps = ["Details", "Billing address", "Notes"]
const stepsHeader = [
  "Enter the details below ",
  "Enter your billing details below",
  "Note",
]

function getStepContent(
  step,
  handleNext,
  handleBack,
  setCustomerDetail,
  setBillingDetail,
  setNotes
) {
  switch (step) {
    case 0:
      return (
        <Details
          handleNext={handleNext}
          setCustomerDetail={setCustomerDetail}
        />
      )
    case 1:
      return (
        <BillingAddress
          handleNext={handleNext}
          handleBack={handleBack}
          setBillingDetail={setBillingDetail}
        />
      )
    case 2:
      return <Notes handleNext={handleNext} setNotes={setNotes} />
    default:
      return null
  }
}

export const CreateCustomers = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [customerDetail, setCustomerDetail] = useState({})
  const [billingDetail, setBillingDetail] = useState({})
  const [notes, setNotes] = useState("")
  const [createCustomer, { isLoading, isError, isSuccess, status, data }] =
    useCreateCustomerMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const postdata = {
      FirstName: customerDetail.firstName,
      LastName: customerDetail.LastName,
      Email: customerDetail.email,
      Password: customerDetail.password,
      DOB: customerDetail.formattedDate,
      Gender: customerDetail.gender,
      BillingName: billingDetail.billingName,
      BillingCountry: billingDetail.billingCountry,
      BillingAddressLine1: billingDetail.billingAddressLine1,
      BillingAddressLine2: billingDetail.billingAddressLine2,
      BillingTown: billingDetail.billingTown,
      BillingPostalCode: billingDetail.billingPostcode,
      BillingEmail: billingDetail.billingEmailAddress,
      BillingPhone: billingDetail.billingTelephone,
      Notes: notes,
    }
    await createCustomer(postdata)
  }

  useEffect(() => {
    if (isSuccess) navigate("/customers")
  }, [isSuccess, navigate])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Container
      sx={{
        "&.MuiContainer-root": {
          p: 0,
          maxWidth: "1280px",
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
                setCustomerDetail,
                setBillingDetail,
                setNotes
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  )
}
