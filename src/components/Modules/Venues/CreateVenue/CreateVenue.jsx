import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"
import {
  useAddEventVenueMutation,
  useEditEventVenueMutation,
} from "../../../../store/services/Veneus/Veneus.services"
import { venuesInputFields } from "../../../Common/Fields"
import { useDispatch, useSelector } from "react-redux"
import { clearEditData } from "../../../../store/slices/editDataSlice"
import { useFormik } from "formik"
import * as yup from "yup"
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string().required("Location is required"),
  address: yup.string().required("Address is required"),
  latitude: yup.string().required("Latitude is required"),
  longitude: yup.string().required("Longitude is required"),
  // latitude: yup.string().required("Latitude is required"),
  googleMapEmbedCode: yup.string().required("GoogleMapEmbedCode is required"),
  blockAlias: yup.string().required("BlockAlias is required"),
  blocksAlias: yup.string().required("BlocksAlias is required"),
  rowAlias: yup.string().required("RowAlias is required"),
  rowsAlias: yup.string().required("RowsAlias is required"),
  seatalias: yup.string().required("Seatalias is required"),
  seatsalias: yup.string().required("Seatsalias is required"),
  tablealias: yup.string().required("Tablealias is required"),
  tablesalias: yup.string().required("Tablesalias is required"),
  basicStandardPlan: yup.string().required("BasicStandardPlan is required"),
  notes: yup.string().required("Notes is required"),
})
const initialFormData = Object.fromEntries(
  venuesInputFields.map((field) => [field.name, ""])
)
export const CreateVenue = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  console.log(editData)
  const [venueTextEditor, setVenueTextEditor] = useState("")
  const [addEventVenue, { isLoading, isError, isSuccess, status, data }] =
    useAddEventVenueMutation()
  const [
    editEventVenue,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditEventVenueMutation()

  const isEditing = !!editData
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ font: [] }],
      [{ case: "upper" }, { case: "lower" }],
      ["link", "image"],
    ],
  }
  const formats = ["header", "bold", "italic", "underline", "link", "image"]

  const formik = useFormik({
    initialValues: initialFormData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isEditing) {
        const postdata = {
          Id: editData.Id,
          Name: values.name,
          Location: values.location,
          Address: values.address,
          Latitude: values.latitude,
          Longitude: values.longitude,
          GoogleMapEmbedCode: values.GoogleMapEmbedCode,
          BlockAlias: values.blockAlias,
          BlocksAlias: values.blocksAlias,
          RowAlias: values.rowAlias,
          RowsAlias: values.rowsAlias,
          SeatAlias: values.seatalias,
          SeatsAlias: values.seatsalias,
          TableAlias: values.tablealias,
          TablesAlias: values.tablesalias,
          BasicStandardPlan: values.BasicStandardPlan,
          Notes: venueTextEditor,
        }

        await editEventVenue(postdata)
        dispatch(clearEditData())
      } else {
        const postdata = {
          Name: formik.values.name,
          Location: formik.values.location,
          Address: formik.values.address,
          Latitude: formik.values.latitude,
          Longitude: formik.values.longitude,
          GoogleMapEmbedCode: formik.values.GoogleMapEmbedCode,
          BlockAlias: formik.values.blockAlias,
          BlocksAlias: formik.values.blocksAlias,
          RowAlias: formik.values.rowAlias,
          RowsAlias: formik.values.rowsAlias,
          SeatAlias: formik.values.seatalias,
          SeatsAlias: formik.values.seatsalias,
          TableAlias: formik.values.tablealias,
          TablesAlias: formik.values.tablesalias,
          BasicStandardPlan: formik.values.BasicStandardPlan,
          Notes: venueTextEditor,
        }

        await addEventVenue(postdata)
      }
    },
  })

  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/venues")
    }
  }, [isSuccess, navigate, editSuccess])
  useEffect(() => {
    if (editData) {
      formik.setValues({
        name: editData.Name,
        location: editData.Location,
        address: editData.Address,
        latitude: editData.Latitude,
        longitude: editData.Longitude,
        googleMapEmbedCode: editData.GoogleMapEmbedCode,
        blockAlias: editData.BlockAlias,
        blocksAlias: editData.BlocksAlias,
        rowAlias: editData.BlockAlias,
        rowsAlias: editData.RowsAlias,
        seatalias: editData.SeatAlias,
        seatsalias: editData.SeatsAlias,
        tablealias: editData.TableAlias,
        tablesalias: editData.TablesAlias,
        basicStandardPlan: editData.BasicStandardPlan,
      })
      setVenueTextEditor(editData.Notes)
    }
  }, [editData, formik.setValues])

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
        <Typography
          sx={{
            color: "#202020",
            fontWeight: 500,
            fontSize: "22px",
            mt: "50px",
          }}
        >
          Enter the details below
        </Typography>
        <Grid
          container
          justifyContent='space-between'
          columnSpacing={4}
          // sx={{ mt: "32px" }}
        >
          {venuesInputFields.map((field, index) => (
            <Grid
              item
              xs={field.columnWidthxs}
              sm={field.columnWidthsm}
              md={field.columnWidthLg}
              key={index}
              sx={{ mt: "32px" }}
            >
              <InputField
                label={field.label}
                field={formik.getFieldProps(field.name)}
                form={formik}
              />
              <FormHelperText>
                {formik.touched[field.name] && formik.errors[field.name]}
              </FormHelperText>
            </Grid>
          ))}
          <Grid item md={12}>
            <Typography
              sx={{
                color: "#707070",
                fontSize: "14px",
                fontWeight: 400,
                pb: "8px",
              }}
            >
              Notes
            </Typography>
            <ReactQuill
              theme='snow'
              modules={modules}
              formats={formats}
              value={formik.values.notes}
              onChange={(value) => formik.setFieldValue("notes", value)}
              styles={{ height: "170px", background: "white" }}
            />
            {/* <FormHelperText>
              {formik.touched.notes && formik.errors.notes}
            </FormHelperText> */}
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            my: "48px",
          }}
        >
          <Button
            type='submit'
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
            {isEditing ? "Edit venue" : "Done"}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
