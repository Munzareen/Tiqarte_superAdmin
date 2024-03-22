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
import { DnDLabel } from "../../../../../Common/DnDLabel/DnDLabel"
import { DnDFile } from "../../../../../Common/DnDFile.jsx/DnDFile"
import AddIcon from "@mui/icons-material/Add"
export const TicketDetails = ({ handleNext, setTicketDetails }) => {
  const [formData, setFormData] = useState({
    type: "",
    ticketPrice: "",
    bookingFee: "",
    availableTickets: "",
    seasonTicketType: "",
    attendeeAgeType: "",
    hideFromFrontEnd: true,
    excludeFromOverAllCapacity: true,
    maximumtickets: "",
    minimumTickets: "",
    unitCost: "",
    requestTicketsHolderDetails: "",
    attachDocument: "",
    acknowledgements: "",
    metadata: "",
  })

  const [venueTextEditor, setVenueTextEditor] = useState("")
  const [tickets, setTickets] = useState([])
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
  const handleSubmit = () => {
    setTicketDetails({ ...formData, ticketDes: venueTextEditor })
    handleNext()
  }
  // const handleAddTicket = () => {
  //   setTickets([...tickets, formData]) // Add the current formData to the tickets array
  //   setFormData({
  //     type: "",
  //     ticketPrice: "",
  //     bookingFee: "",
  //     availableTickets: "",
  //     seasonTicketType: "",
  //     attendeeAgeType: "",
  //     hideFromFrontEnd: true,
  //     excludeFromOverAllCapacity: true,
  //     maximumtickets: "",
  //     minimumTickets: "",
  //     unitCost: "",
  //     requestTicketsHolderDetails: "",
  //   })
  // }
  const updateImgState = (label, newImgValue) => {
    setFormData({
      ...formData,
      [label]: newImgValue,
    })
  }
  return (
    <Grid container columnSpacing={4} sx={{ mt: "32px" }}>
      <Grid item xs={12} sm={6} md={4}>
        <InputField
          label={"Type"}
          name={"type"}
          value={formData.type}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <InputField
          label={"Ticket price"}
          name={"ticketPrice"}
          value={formData.ticketPrice}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <InputField
          label={"Booking fee"}
          name={"bookingFee"}
          value={formData.bookingFee}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "24px" }}>
        <InputField
          label={"Available tickets"}
          name={"availableTickets"}
          value={formData.availableTickets}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "24px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Season ticket type"}
          name={"seasonTicketType"}
          value={formData.seasonTicketType}
          handleChange={handleFormElements}
        >
          <MenuItem value='Per'>
            <em>Per</em>
          </MenuItem>
          <MenuItem value={"Amount"}>Amount</MenuItem>
        </CustomSelectWithoutLabel>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "24px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Attendee age type"}
          name={"attendeeAgeType"}
          value={formData.attendeeAgeType}
          handleChange={handleFormElements}
        >
          <MenuItem value='Per'>
            <em>Per</em>
          </MenuItem>
          <MenuItem value={"Amount"}>Amount</MenuItem>
        </CustomSelectWithoutLabel>
      </Grid>
      <Grid item xs={4} sx={{ mt: "24px" }}>
        <FormControlLabel
          sx={{
            color: "#758895",
            "& .MuiTypography-root": {
              fontSize: "14px",
            },
          }}
          control={
            <Checkbox
              name='hideFromFrontEnd'
              defaultChecked={formData.hideFromFrontEnd}
              value={formData.hideFromFrontEnd}
              onChange={handleFormElements}
            />
          }
          label='Hide from frontend'
        />
      </Grid>
      <Grid item xs={4} sx={{ mt: "24px" }}>
        <FormControlLabel
          sx={{
            color: "#758895",
            "& .MuiTypography-root": {
              fontSize: "14px",
            },
          }}
          control={
            <Checkbox
              name='excludeFromOverAllCapacity'
              defaultChecked={formData.excludeFromOverAllCapacity}
              value={formData.excludeFromOverAllCapacity}
              onChange={handleFormElements}
            />
          }
          label='Exclude from overall capacity'
        />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Maximum tickets"}
          name={"maximumtickets"}
          value={formData.maximumtickets}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Minimum tickets "}
          name={"minimumTickets"}
          value={formData.minimumTickets}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <InputField
          label={"Unit cost"}
          name={"unitCost"}
          value={formData.unitCost}
          onChange={handleFormElements}
        />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Request ticket holder details"}
          sx={{ width: "100%" }}
          name={"requestTicketsHolderDetails"}
          value={formData.requestTicketsHolderDetails}
          handleChange={handleFormElements}
        >
          <MenuItem value='yes'>
            <em>Yes</em>
          </MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
        </CustomSelectWithoutLabel>
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
          Ticket description (optional)
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
        <DnDLabel lable={"Attach document (optional)"} />
        <Box sx={{ width: "100%" }}>
          <DnDFile label='attachDocument' updateImgState={updateImgState} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <DnDLabel lable={"Acknowledgements (optional)"} />
        <Box sx={{ width: "100%" }}>
          <DnDFile label='acknowledgements' updateImgState={updateImgState} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
        <DnDLabel lable={"Meta data (optional)"} />
        <Box sx={{ width: "100%" }}>
          <DnDFile label='metadata' updateImgState={updateImgState} />
        </Box>
      </Grid>
      {/* <Grid item md={12} sx={{ mt: "32px" }}>
        <Button startIcon={<AddIcon />}>Add ticket 2</Button>
      </Grid> */}

      <Grid item xs={12} sx={{ mt: "48px", mb: "190px" }}>
        <Button
          variant='contained'
          onClick={handleSubmit}
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
