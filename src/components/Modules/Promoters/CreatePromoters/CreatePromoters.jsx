import { Box, Button, Container, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useNavigate } from "react-router-dom"
import {
  useAddEventPromoterMutation,
  useEditEventPromotorMutation,
} from "../../../../store/services/Promoters/Promoters.services"
import { useDispatch, useSelector } from "react-redux"
import { clearEditData } from "../../../../store/slices/editDataSlice"
import { DnDLabel } from "../../../Common/DnDLabel/DnDLabel"
import { DnDFile } from "../../../Common/DnDFile.jsx/DnDFile"

export const CreatePromoters = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    image: "",
    secrets: "",
    key: "",
  })
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)

  const handlePaymentMethodSelect = (id) => {
    setSelectedPaymentMethod(id)
  }
  const [addEventPromoter, { isLoading, isError, isSuccess, status, data }] =
    useAddEventPromoterMutation()
  const [
    editEventPromotor,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditEventPromotorMutation()
  const isEditing = !!editData
  console.log(editData)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isEditing) {
      const postdata = {
        Id: editData.Id,
        Name: formData.name,
        Email: formData.email,
        Telephone: formData.telephone,
        ImageUrl: formData.image,
        PaymentGateway: selectedPaymentMethod,
        SecretKey: formData.secrets,
        APIKey: formData.key,
      }
      await editEventPromotor(postdata)
      dispatch(clearEditData())
    }
    const postdata = {
      Name: formData.name,
      Email: formData.email,
      Telephone: formData.telephone,
      ImageUrl: formData.image,
      PaymentGateway: selectedPaymentMethod,
      SecretKey: formData.secrets,
      APIKey: formData.key,
    }
    await addEventPromoter(postdata)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/promoters")
    }
  }, [isSuccess, navigate])
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.Name,
        email: editData.Email,
        telephone: editData.Telephone,
        image: editData.ImageUrl,
        secrets: editData.SecretKey,
        key: editData.APIKey,
      })
      setSelectedPaymentMethod(editData.PaymentGateway)
    }
  }, [editData])
  const updateImgState = (label, newImgValue) => {
    setFormData({
      ...formData,
      [label]: newImgValue,
    })
  }
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Box component='form' onSubmit={handleSubmit}>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} sx={{ mt: "50px" }}>
            <Typography
              sx={{
                color: "#202020",
                fontWeight: 500,
                fontSize: "22px",
              }}
            >
              Enter the details below
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} sx={{ mt: "32px" }}>
            <InputField
              label={"Name"}
              sx={{ width: "100%" }}
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} sx={{ mt: "32px" }}>
            <InputField
              label={"Email"}
              sx={{ width: "100%" }}
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mt: "32px" }}>
            <InputField
              label={"Telephone"}
              sx={{ width: "100%" }}
              name='telephone'
              value={formData.telephone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "32px" }}>
            <Box sx={{ mt: "32px" }}>
              <DnDLabel lable={"Upload image"} />
              <DnDFile label='image' updateImgState={updateImgState} />
            </Box>
          </Grid>
          {formData.image && (
            <Box>
              <Box
                component='img'
                src={formData.image}
                sx={{ width: "150px", height: "150px", mt: "1rem" }}
              />
            </Box>
          )}
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "22px", color: "#202020", mt: "48px" }}>
              Overwrite payment gateways
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} sx={{ mt: "32px" }}>
            <PaymentMethods
              icon={"/stripe.png"}
              methodName={"Stripe"}
              id={1}
              selectedId={selectedPaymentMethod}
              onSelect={handlePaymentMethodSelect}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} sx={{ mt: "32px" }}>
            <PaymentMethods
              icon={"/paypal.png"}
              methodName={"Paypal"}
              id={2}
              selectedId={selectedPaymentMethod}
              onSelect={handlePaymentMethodSelect}
            />
          </Grid>
          <Grid item xs={12} lg={4} sx={{ mt: "32px" }}>
            <PaymentMethods
              icon={"/visa.png"}
              methodName={"Visa"}
              id={3}
              selectedId={selectedPaymentMethod}
              onSelect={handlePaymentMethodSelect}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"Secrets"}
              sx={{ width: "100%" }}
              name='secrets'
              value={formData.secrets}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"key"}
              sx={{ width: "100%" }}
              name='key'
              value={formData.key}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "48px" }}>
            <Button
              type='submit'
              variant='contained'
              sx={{
                color: "white",
                borderColor: "#FCA311",
                width: { xs: "100%", sm: "332px" },
                height: "55px",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "19px",
                bgcolor: "#2460B8",
                textTransform: "capitalize",
                borderRadius: "16px",
                border: "1px soliid #FCA311",
                "&.MuiButton-root:hover": {
                  bgcolor: "#2460B8",
                },
              }}
            >
              {isEditing ? "Edit promoter" : "Done"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
export const PaymentMethods = ({
  methodName,
  icon,
  id,
  selectedId,
  onSelect,
}) => {
  const isSelected = selectedId === id

  const handleClick = () => {
    onSelect(id)
  }
  return (
    <Box
      sx={{
        border: `1px solid ${isSelected ? "#2460B8" : "#CFCFCF"}`,
        bgcolor: isSelected ? "#F0F4FA" : "white",
        width: "100%",
        height: "56px",
        borderRadius: "16px",
        // bgcolor: "white",
        cursor: "pointer", // Add cursor pointer to make it clickable
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: "flex", alignItems: "center", ml: "24px" }}>
        <Box component='img' src={icon} sx={{ py: "8px" }} />
        <Box sx={{ color: "#202020", ml: "12px" }}>{methodName}</Box>
      </Box>
    </Box>
  )
}
