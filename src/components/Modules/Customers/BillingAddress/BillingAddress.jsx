import React, { useState } from "react"
import { Box, Button, Grid } from "@mui/material"
import { InputField } from "../../../Common/InputField"

export const BillingAddress = ({ handleNext, setBillingDetail }) => {
  const [formData, setFormData] = useState({
    billingName: "",
    billingCountry: "",
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingTown: "",
    billingPostcode: "",
    billingEmailAddress: "",
    billingTelephone: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setBillingDetail({ ...formData })
    handleNext()
  }

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    })
  }

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Billing name"}
          sx={{ width: "100%" }}
          value={formData.billingName}
          onChange={(e) => handleFieldChange("billingName", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Billing country"}
          sx={{ width: "100%" }}
          value={formData.billingCountry}
          onChange={(e) => handleFieldChange("billingCountry", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Billing address line 1"}
          sx={{ width: "100%" }}
          value={formData.billingAddressLine1}
          onChange={(e) =>
            handleFieldChange("billingAddressLine1", e.target.value)
          }
        />
        <Grid item xs={12} sm={6} sx={{ mt: "32px" }}></Grid>
        <InputField
          label={"Billing address line 2"}
          sx={{ width: "100%" }}
          value={formData.billingAddressLine2}
          onChange={(e) =>
            handleFieldChange("billingAddressLine2", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Billing town"}
          sx={{ width: "100%" }}
          value={formData.billingTown}
          onChange={(e) => handleFieldChange("billingTown", e.target.value)}
        />
        <Grid item xs={12} sm={6} sx={{ mt: "32px" }}></Grid>
        <InputField
          label={"Billing postcode"}
          sx={{ width: "100%" }}
          value={formData.billingPostcode}
          onChange={(e) => handleFieldChange("billingPostcode", e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Billing email address"}
          sx={{ width: "100%" }}
          value={formData.billingEmailAddress}
          onChange={(e) =>
            handleFieldChange("billingEmailAddress", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Billing telephone"}
          sx={{ width: "100%" }}
          value={formData.billingTelephone}
          onChange={(e) =>
            handleFieldChange("billingTelephone", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "56px" }}>
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
