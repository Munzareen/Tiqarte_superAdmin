import React, { useEffect, useState } from "react"
// import { InputField } from "../../Common/InputField"
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material"
import SearchInput from "../../../Common/SearchInput"

import { FormLabel } from "@mui/material"
import { InputField } from "../../../Common/InputField"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearEditData } from "../../../../store/slices/editDataSlice"
import { useEditOrderDetailsMutation } from "../../../../store/services/Order/order.services"
export const PrintTicket = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const [editOrderDetails, { isSuccess }] = useEditOrderDetailsMutation()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    billingName: "",
    billingCountry: "",
    billingAddressL1: "",
    billingAddressL2: "",
    billingTown: "",
    billingState: "",
    billingPostcode: "",
    billingEmailAddress: "",
    billingTelephone: "",
  })

  const isEditing = !!editData
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isEditing) {
      const editedData = {
        Id: editData.Id,
        BillingName: formData.billingName,
        BillingEmail: formData.billingEmailAddress,
        BillingTelephone: formData.billingTelephone,
        BillingCountry: formData.billingCountry,
        BillingTown: formData.billingTown,
        BillingPostalCode: formData.billingPostcode,
        BillingAddressLine1: formData.billingAddressL1,
        BillingAddressLine2: formData.billingAddressL2,
        BillingState: formData.billingState,
      }
      await editOrderDetails(editedData)
      dispatch(clearEditData())
    }
  }
  useEffect(() => {
    if (isSuccess) {
      navigate("/order")
    }
  }, [isSuccess])

  useEffect(() => {
    if (editData) {
      setFormData({
        billingName: editData.Name,
        billingEmailAddress: editData.Email,
        billingTelephone: editData.Telephone,
        billingCountry: editData.BillingCountry,
        billingTown: editData.BillingTown,
        billingPostcode: editData.BillingPostalCode,
        billingAddressL1: editData.BillingAddressLine1,
        billingAddressL2: editData.BillingAddressLine2,
        billingState: editData.BillingState,
      })
    }
  }, [editData])

  return (
    <>
      <Typography
        sx={{
          color: "#202020",
          fontWeight: 500,
          fontSize: "22px",
          mt: "40px",
        }}
      >
        Enter the detail below
      </Typography>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing name"}
          sx={{ width: "515px" }}
          onChange={handleInputChange}
          value={formData.billingName}
          name='billingName'
        />
        <InputField
          label={"Billing country"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleInputChange}
          value={formData.billingCountry}
          name='billingCountry'
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing address line 1"}
          sx={{ width: "515px" }}
          onChange={handleInputChange}
          value={formData.billingAddressL1}
          name='billingAddressL1'
        />
        <InputField
          label={"Billing address line 2"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleInputChange}
          value={formData.billingAddressL2}
          name='billingAddressL2'
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing town"}
          sx={{ width: "515px" }}
          onChange={handleInputChange}
          value={formData.billingTown}
          name='billingTown'
        />
        <InputField
          label={"Billing postcode"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleInputChange}
          value={formData.billingPostcode}
          name='billingPostcode'
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing email address"}
          sx={{ width: "515px" }}
          onChange={handleInputChange}
          value={formData.billingEmailAddress}
          name='billingEmailAddress'
        />
        <InputField
          label={"Billing telephone"}
          sx={{ width: "515px", ml: "33px" }}
          onChange={handleInputChange}
          value={formData.billingTelephone}
          name='billingTelephone'
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Billing State"}
          sx={{ width: "515px" }}
          onChange={handleInputChange}
          value={formData.billingState}
          name='billingEmailAddress'
        />
      </Box>
      <Box sx={{ mt: "56px" }}>
        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{
            color: "white",
            borderColor: "#FCA311",
            width: "332px",
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            border: "1px soliid #FCA311",
            "&.MuiButton-root:hover": {
              bgcolor: "#2460B8",
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </>
  )
}
