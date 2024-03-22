import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { InputField } from "../../../../../Common/InputField"
import InputDateAndTimePicker from "../../../../../Common/InputDateAndTimePicker"
import { DateField, TimeField } from "@mui/x-date-pickers"
import { CustomSelectWithoutLabel } from "../../../../../Common/CustomSelectWithoutLabel"
import ReactQuill from "react-quill"
import dayjs from "dayjs"
import { useGetAllEventPromotersQuery } from "../../../../../../store/services/Promoters/Promoters.services"
import { useSelector } from "react-redux"

export const Initials = ({ setInitials, handleNext }) => {
  const editData = useSelector((state) => state.editData)
  console.log(editData)
  const [formData, setFormData] = useState({
    dateFrom: null,
    timeFrom: null,
    eventRunTimeInMins: "",
    displayEventTimeOnEventSection: true,
    location: "",
    managementFeeInPercentageOrAmount: "",
    percentageOrAmount: "",
    addBookingFree: true,
    OverrideCapacityScheduleSoldOut: "",
    minimumAge: "",
    productURL: "",
    isItBuyable: "",
    markedAsSold: "",
    promoter: "",
    venue: "",
  })

  const [venueTextEditor, setVenueTextEditor] = useState("")
  const {
    data: allEventPromoter,
    error,
    isLoading,
  } = useGetAllEventPromotersQuery()
  const handleEditorChange = (html) => {
    setVenueTextEditor(html)
  }

  //   const isEditing = !!editData
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
  const handleFormElements = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setInitials({ ...formData, copy: venueTextEditor })
    handleNext()
  }
  return (
    <Grid container columnSpacing={4} sx={{ mt: "32px" }}>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
          "& .MuiStack-root": {
            width: "100%",
          },
        }}
      >
        <InputDateAndTimePicker
          field='DateField'
          React
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
              value={formData.dateFrom}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  dateFrom: date,
                })
              }
            />
          }
          label={"Date "}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{
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
              value={formData.timeFrom}
              onChange={(time) =>
                setFormData({
                  ...formData,
                  timeFrom: time,
                })
              }
            />
          }
          label={"Time "}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <InputField
          label={"Event run time in mnutes"}
          name={"eventRunTimeInMins"}
          value={formData.eventRunTimeInMins}
          onChange={handleFormElements}
        />
        <Box sx={{}}>
          <FormControlLabel
            sx={{
              color: "#758895",
              "& .MuiTypography-root": {
                fontSize: "14px",
              },
            }}
            control={
              <Checkbox
                defaultChecked={formData.displayEventTimeOnEventSection}
                name='displayEventTimeOnEventSection'
                onChange={handleFormElements}
              />
            }
            label='Display event time on event section'
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "24px" }}>
        <InputField
          label={"Location"}
          name={"location"}
          value={formData.location}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "24px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Management Fee in percentage or amount"}
          name={"managementFeeInPercentageOrAmount"}
          value={formData.managementFeeInPercentageOrAmount}
          handleChange={handleFormElements}
        >
          <MenuItem value='Per'>
            <em>Per</em>
          </MenuItem>
          <MenuItem value={"Amount"}>Amount</MenuItem>
        </CustomSelectWithoutLabel>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "24px" }}>
        <InputField
          label={"Percentage or amount"}
          name={"percentageOrAmount"}
          value={formData.percentageOrAmount}
          onChange={handleFormElements}
        />
        <Box sx={{}}>
          <FormControlLabel
            sx={{
              color: "#758895",
              "& .MuiTypography-root": {
                fontSize: "14px",
              },
            }}
            control={
              <Checkbox
                name='addBookingFree'
                defaultChecked={formData.addBookingFree}
                value={formData.addBookingFree}
                onChange={handleFormElements}
              />
            }
            label='Add €1 booking fee under €10'
          />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ mt: "24px" }}>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "14px",
            fontWeight: 400,
            pb: "8px",
          }}
        >
          Copy
        </Typography>
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={venueTextEditor}
          onChange={handleEditorChange}
          styles={{ height: "170px", background: "white" }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <InputField
          label={"Override capacity schedule sold out"}
          name={"OverrideCapacityScheduleSoldOut"}
          value={formData.OverrideCapacityScheduleSoldOut}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <InputField
          label={"Minimum age"}
          name={"minimumAge"}
          value={formData.minimumAge}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <InputField
          label={"Product URL (if it present it will overwrite else)"}
          name={"productURL"}
          value={formData.productURL}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Is it buyable?"}
          name={"isItBuyable"}
          value={formData.isItBuyable}
          handleChange={handleFormElements}
        >
          <MenuItem value='yes'>
            <em>Yes</em>
          </MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
        </CustomSelectWithoutLabel>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Mark as sold"}
          name={"markedAsSold"}
          value={formData.markedAsSold}
          handleChange={handleFormElements}
        >
          <MenuItem value='res'>
            <em>Yes</em>
          </MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
        </CustomSelectWithoutLabel>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Promoter"}
          sx={{ width: "100%" }}
          value={formData.promoter}
          name={"promoter"}
          handleChange={handleFormElements}
        >
          {isLoading && (
            <Typography sx={{ textAlign: "center" }}>
              Fetching Promoters...
            </Typography>
          )}
          {allEventPromoter?.map((promoter) => {
            return (
              <MenuItem value={promoter.Id} key={promoter.Id}>
                {promoter.Name}
              </MenuItem>
            )
          })}
        </CustomSelectWithoutLabel>
      </Grid>
      <Grid item xs={12} sx={{ mt: "32px" }}>
        <InputField
          label={"Venue"}
          sx={{ width: "100%" }}
          name={"venue"}
          value={formData.venue}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={4} sx={{ mt: "48px", mb: "190px" }}>
        <Button
          variant='contained'
          onClick={handleSubmit}
          sx={{
            color: "white",
            width: "332px",
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "19px",
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            "&.MuiButton-root:hover": {
              //   boxShadow: "none",
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
