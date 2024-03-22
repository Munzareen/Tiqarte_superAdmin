import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useNavigate } from "react-router-dom"
import InputDateAndTimePicker from "../../../Common/InputDateAndTimePicker"
import { DateField, TimeField } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"
import {
  useAddDiscountCodeMutation,
  useEditDiscountCodeMutation,
} from "../../../../store/services/DiscountCode/discountCode.services"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { clearEditData } from "../../../../store/slices/editDataSlice"
import { useGetAllEventQuery } from "../../../../store/services/Events/event.services"
import { useFormik } from "formik"
import * as yup from "yup"
const validationSchema = yup.object().shape({
  code: yup.string().required("Code is required"),
  basis: yup.string().required("Basis is required"),
  fixedAmount: yup.string().required("Fixed amount is required"),
  dateFrom: yup.date().required("Valid from date is required"),
  dateTo: yup.date().required("Expiry date is required"),
  timeFrom: yup.string().required("Valid from time is required"),
  timeTo: yup.string().required("Expiry time is required"),
  useAgeLimit: yup.string().required("Usage limit is required"),
  useAgeLimitPerCustomer: yup
    .string()
    .required("Usage limit per customer is required"),
  applyDiscount: yup.string().required("Apply discount is required"),
  events: yup.string().required("Choose an event"),

  includeBookingFee: yup.string().required("Include booking fee is required"),
  autoApply: yup.boolean().required("Auto apply is required"),
})

export const CreateDiscountCode = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  console.log(editData)
  const dispatch = useDispatch()
  const {
    data: allEvents,
    error,
    isLoading: isEventLoading,
  } = useGetAllEventQuery()
// console.log(allEvents)
  const [addDiscountCode, { isLoading, isError, isSuccess, status, data }] =
    useAddDiscountCodeMutation()
  const [
    editDiscountCode,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditDiscountCodeMutation()

  const isEditing = !!editData

  const formik = useFormik({
    initialValues: {
      code: "",
      fixedAmount: "",
      dateFrom: dayjs(),
      dateTo: dayjs(),
      timeFrom: dayjs().format("HH:mm"),
      timeTo: dayjs().format("HH:mm"),
      applyDiscount: "",
      useAgeLimit: "",
      useAgeLimitPerCustomer: "",
      events: "",
      basis: "",
      includeBookingFee: "",
      autoApply: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const postdata = {
        Code: values.code,
        Basis: values.basis.toLowerCase(),
        FixedAmount: values.fixedAmount,
        IncludeBookingFee: values.includeBookingFee === "yes" ? true : false,
        EventId: [values.events],
        ValidFromDate: values.dateFrom,
        ValidFormTime: values.timeFrom,
        ExpiryDate: values.dateTo,
        ExpiryTime: values.timeTo,
        UsageLimit: values.useAgeLimit,
        UsageLimitPerCustomer: values.useAgeLimitPerCustomer,
        PostalCodeDiscounts: values.applyDiscount,
        AutoApply: values.autoApply,
      }

      if (isEditing) {
        await editDiscountCode({ Id: editData.Id, ...postdata })
        dispatch(clearEditData())
      } else {
        await addDiscountCode(postdata)
      }
    },
  })

  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/discount")
      toast.success(data)
    }
  }, [isSuccess, navigate, editSuccess])
  useEffect(() => {
    if (editData) {
      formik.setValues({
        code: editData.Code,
        basis: editData.Basis.toLowerCase(),
        fixedAmount: editData.FixedAmount,
        includeBookingFee: editData.IncludeBookingFee === true ? "yes" : "no",
        dateFrom: dayjs(editData.ValidFromDate),
        dateTo: dayjs(editData.ExpiryDate),
        timeFrom: dayjs(editData.ValidFormTime),
        timeTo: dayjs(editData.ExpiryTime),
        applyDiscount: editData.PostalCodeDiscounts,
        useAgeLimit: editData.UsageLimit,
        useAgeLimitPerCustomer: editData.UsageLimitPerCustomer,
        events: editData.EventId.toString(),
        autoApply: editData.AutoApply,
      })
    }
  }, [editData])
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Box component='form' onSubmit={formik.handleSubmit}>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} sx={{ mt: "30px" }}>
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
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"Code"}
              field={formik.getFieldProps("code")}
              form={formik}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <CustomSelectWithoutLabel
              label={"Basics"}
              field={formik.getFieldProps("basis")}
              form={formik}
            >
              <MenuItem value='fixed'> <em>Fixed</em> </MenuItem>
              <MenuItem value={"notfixed"}>Not-fixed</MenuItem>
            </CustomSelectWithoutLabel>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"Fixed amount"}
              field={formik.getFieldProps("fixedAmount")}
              form={formik}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <CustomSelectWithoutLabel
              label={"Include booking fee"}
              field={formik.getFieldProps("includeBookingFee")}
              form={formik}
            >
              <MenuItem value='yes'>
                <em>Yes</em>
              </MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </CustomSelectWithoutLabel>
          </Grid>
          <Grid item xs={12} sx={{ mt: "56px" }}>
            <Typography
              sx={{
                color: "#202020",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Event schedule
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: "32px" }}>
            <CustomSelectWithoutLabel
              label={"Choose Event"}
              field={formik.getFieldProps("events")}
              form={formik}
            >
              {isEventLoading && (
                <Typography sx={{ textAlign: "center" }}>
                  Fetching events...
                </Typography>
              )}
              {allEvents?.map((event) => {
                return (
                  <MenuItem value={event.data.EventId} key={event.data.EventId}>
                    {event.data.Title}
                  </MenuItem>
                )
              })}
            </CustomSelectWithoutLabel>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: "32px",
              "& .MuiStack-root": {
                width: "100%",
              },
            }}
          >
            <InputDateAndTimePicker
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

                      "& .MuiTypography-root": {
                        color: "red",
                        fontSize: "14px",
                      },
                    },
                  }}
                  value={formik.values.dateFrom}
                  onChange={(date) => formik.setFieldValue("dateFrom", date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.dateFrom &&
                        Boolean(formik.errors.dateFrom)
                      }
                      helperText={
                        formik.touched.dateFrom && formik.errors.dateFrom
                      }
                    />
                  )}
                />
              }
              label={"Date (valid from)"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: "32px",
              "& .MuiStack-root": {
                width: "100%",
              },
            }}
          >
            <InputDateAndTimePicker
              field='TimeField'
              fieldType={
                <TimeField
                ampm={false}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "48px",

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
              
                  onChange={(time) => formik.setFieldValue("timeFrom", time)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.timeFrom &&
                        Boolean(formik.errors.timeFrom)
                      }
                      helperText={
                        formik.touched.timeFrom && formik.errors.timeFrom
                      }
                    />
                  )}
                />
              }
              label={"Time (Valid from)"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: "32px",
              "& .MuiStack-root": {
                width: "100%",
              },
            }}
          >
            <InputDateAndTimePicker
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

                      "& .MuiTypography-root": {
                        color: "red",
                        fontSize: "14px",
                      },
                    },
                  }}
                  // value={formData.dateTo}
                  onChange={(time) => formik.setFieldValue("dateTo", time)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.dateTo && Boolean(formik.errors.dateTo)
                      }
                      helperText={formik.touched.dateTo && formik.errors.dateTo}
                    />
                  )}
                />
              }
              label={"Expiry Date"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: "32px",
              "& .MuiStack-root": {
                width: "100%",
              },
            }}
          >
            <InputDateAndTimePicker
              field='TimeField'
              fieldType={
                <TimeField
                ampm={false}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "48px",

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
                  onChange={(time) => formik.setFieldValue("timeTo", time)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={
                        formik.touched.timeTo &&
                        Boolean(formik.errors.timeTo)
                      }
                      helperText={
                        formik.touched.timeTo && formik.errors.timeTo
                      }
                    />
                  )}
                />
              }
              label={"Expiry Time"}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"Usage limit"}
              field={formik.getFieldProps("useAgeLimit")}
              form={formik}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"Usage limit per customer"}
              field={formik.getFieldProps("useAgeLimitPerCustomer")}
              form={formik}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "56px" }}>
            <Typography
              sx={{
                color: "#202020",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Optional conditions
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: "32px" }}>
            <InputField
              label={"Apply discount only if postal code starts or matches"}
              field={formik.getFieldProps("applyDiscount")}
              form={formik}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: "32px" }}>
            <FormControlLabel
              sx={{
                color: "#758895",
                "& .MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
              control={
                <Checkbox
                  name='autoApply'
                  {...formik.getFieldProps("autoApply")}
                />
              }
              label='Schedule'
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: "48px", mt: "32px" }}>
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
                  //   boxShadow: "none",
                  //   borderColor: "#FCA311",
                  bgcolor: "#2460B8",
                },
              }}
            >
              {isEditing ? "Edit discount code" : "Done"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
