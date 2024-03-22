import React, { useState } from "react"
import { InputField } from "../../../Common/InputField"
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material"
import InputDateAndTimePicker from "../../../Common/InputDateAndTimePicker"
import { DateField } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"

export const Details = ({ handleNext, setCustomerDetail }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    date: dayjs("2022-04-17"),
    gender: "",
  })
  const [dateOfBirth, setDateOfBirth] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formattedDate = formData.date.format("MM/DD/YYYY")
    const customerData = {
      ...formData,
      formattedDate: formattedDate,
    }
    setCustomerDetail({ ...customerData })
    handleNext()
  }

  const handleInputChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFieldChange =(date)=>{
    setDateOfBirth(date)
  }
  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={12} sm={6} sx={{ mt: "51px" }}>
        <InputField
          sx={{ width: "100%" }}
          label={"First name"}
          name='firstName'
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "51px" }}>
        <InputField
          sx={{ width: "100%" }}
          label={"Last name"}
          name='lastName'
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mt: "51px" }}>
        <InputField
          sx={{ width: "100%" }}
          label={"Email"}
          name='email'
          value={formData.email}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "51px" }}>
        <InputField
          sx={{ width: "100%" }}
          label={"Password"}
          type={"password"}
          name='password'
          value={formData.password}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          mt: "43px",
          "& .MuiStack-root": {
            width: "100%",
          },
        }}
      >
        <InputDateAndTimePicker
          name='date'
          field='DateField'
          fieldType={
            <DateField
            format="DD/MM/YYYY"
              sx={{
                "& .MuiInputBase-root": {
                  height: "48px",

                  borderRadius: "16px",
                  bgcolor: "white",
                  overflow: "hidden",
                  color: "#707070",
                },
                "& .MuiTypography-root": {
                  color: "red",
                  fontSize: "14px",
                },
              }}
              value={formData.date}
              onChange={(date) => handleFieldChange(dayjs(date))}
            />
          }
          label={"Date of birth"}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "43px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Gender"}
          sx={{ width: "100%" }}
          name='gender'
          value={formData.gender}
          handleChange={handleInputChange}
        >
          <MenuItem value='male'>male</MenuItem>
          <MenuItem value='female'>female</MenuItem>
          <MenuItem value='other'>other</MenuItem>
        </CustomSelectWithoutLabel>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mt: "48px" }}>
        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{
            color: "white",
            width: { xs: "100%", sm: "332px" },
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "19px",
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            "&.MuiButton-root:hover": {
              bgcolor: "#2460B8",
            },
          }}
        >
          Continue
        </Button>
      </Grid>
    </Grid>
  )
}
