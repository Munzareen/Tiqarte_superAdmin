import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useNavigate } from "react-router-dom"
import { useAddScheduledReportMutation } from "../../../../store/services/ScheduleReport/ScheduleReport.services"
import dayjs from "dayjs"
import InputDateAndTimePicker from "../../../Common/InputDateAndTimePicker"
import {
  DateField,
  DateTimePicker,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useDispatch, useSelector } from "react-redux"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"
import * as yup from "yup"
import { useFormik } from "formik"
import { useGetReportsQuery } from "../../../../store/services/Reports/Report.services"

const days = [
  {id: 1, value: "Monday"},
  {id:2, value:"Tuesday"},
  {id:3, value:"Wednesday"},
  {id:4, value:"Thursday"},
  {id:5, value:"Friday"},
  {id:6, value:"Saturday"}
]
const validationSchema = yup.object().shape({
  callReports: yup.string().required("Required"),
  likeSending: yup.string().required("Required"),
  daysOfWeekReports: yup.string().required("Required"),
  ReportSending: yup.string().required("Required"),
  timeToSendReport: yup.string().required("Required"),
  emailsToSendReports: yup.string().required("Required"),
  startDate: yup.date().required("Required"),
  endDate: yup.date().required("Required"),
})

const initialValues = {
  callReports: "",
  likeSending: "",
  daysOfWeekReports: "",
  ReportSending: "",
  timeToSendReport: "",
  emailsToSendReports: "",
  startDate: dayjs(),
  endDate: dayjs(),
}
export const CreateScheduleReport = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  const isEditing = !!editData

  const [addScheduledReport, { isLoading, isError, isSuccess, status, data }] =
    useAddScheduledReportMutation()
  
  const { data: reportType, error, } = useGetReportsQuery()

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Call your mutation here with the form values
        // await addScheduledReport(values);
        const formattedStartDate = dayjs(values.startDate).format("MM/DD/YYYY")
        const formattedEndDate = dayjs(values.endDate).format("MM/DD/YYYY")

        // Update the form values with the formatted dates
        const updatedValues = {
          ...values,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }

        // Call your mutation here with the updated form values
        // await addScheduledReport(updatedValues);
        console.log(updatedValues)
        // navigate("/scheduled");
      } catch (error) {
        console.error("Error submitting form:", error)
      }
    },
  })

  useEffect(() => {
    if (isSuccess) {
      navigate("/scheduled")
    }
  }, [isSuccess])

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
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#202020",
                fontWeight: 500,
                fontSize: "22px",
                mt: "30px",
              }}
            >
              Enter the details below
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"What would you like to call report?"}
              field={formik.getFieldProps("callReports")}
              form={formik}
            />
            <FormHelperText>
              {formik.touched.callReports && formik.errors.callReports}
            </FormHelperText>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <CustomSelectWithoutLabel
              label={"Choose the report that you would like sending"}
              field={formik.getFieldProps("likeSending")}
              form={formik}
            >
              {reportType?.map((item, index)=>(
              <MenuItem key={index} value={item?.Id}>{item?.ReportName}</MenuItem>
              ))}
            </CustomSelectWithoutLabel>
            <FormHelperText>
              {formik.touched.likeSending && formik.errors.likeSending}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <CustomSelectWithoutLabel
              label={"On what day of week should we send the report"}
              field={formik.getFieldProps("daysOfWeekReports")}
              form={formik}
            >
              {days.map((item, index)=>(
              <MenuItem key={index} value={item?.id}>{item?.value}</MenuItem>
              ))}
            </CustomSelectWithoutLabel>
            <FormHelperText>
              {formik.touched.daysOfWeekReports && formik.errors.daysOfWeekReports}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <CustomSelectWithoutLabel
              label={"How often do you want the report sending"}
              field={formik.getFieldProps("ReportSending")}
              form={formik}
            >
              <MenuItem value='yes'>
                <em>Yes</em>
              </MenuItem>
              <MenuItem value={"no"}>No</MenuItem>
            </CustomSelectWithoutLabel>
            <FormHelperText>
              {formik.touched.ReportSending && formik.errors.ReportSending}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={"On what time should we send the report"}
              field={formik.getFieldProps("timeToSendReport")}
              form={formik}
            />
            <FormHelperText>
              {formik.touched.timeToSendReport && formik.errors.timeToSendReport}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
            <InputField
              label={
                "Add the emails that you would like the report sending to "
              }
              field={formik.getFieldProps("emailsToSendReports")}
              form={formik}
            />
            <FormHelperText>
              {formik.touched.emailsToSendReports && formik.errors.emailsToSendReports}
            </FormHelperText>
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
     
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                />
              }
              label={"Start date"}
            />
            <FormHelperText>
              {formik.touched.startDate && formik.errors.startDate}
            </FormHelperText>
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
         
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                />
              }
              label={"End Date"}
            />
            <FormHelperText>
              {formik.touched.endDate && formik.errors.endDate}
            </FormHelperText>
          </Grid>

          <Grid item xs={12} sx={{ my: "48px" }}>
            <Button
              variant='contained'
              type='submit'
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

                border: "1px solid #FCA311",
                "&.MuiButton-root:hover": {
                  bgcolor: "#2460B8",
                },
              }}
            >
              Done
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
