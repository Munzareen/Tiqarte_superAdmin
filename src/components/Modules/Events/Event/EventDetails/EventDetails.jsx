import React, { useEffect, useState } from "react"
import {
  Button,
  FormControlLabel,
  Box,
  Checkbox,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { InputField } from "../../../../Common/InputField"
import { DnDFile } from "../../../../Common/DnDFile.jsx/DnDFile"
import { DnDLabel } from "../../../../Common/DnDLabel/DnDLabel"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export const EventDetails = ({ handleNext, setEventDetail, eventTypes }) => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const isEditing = !!editData

  const [selectEvent, setSelectEvent] = useState('');

  const handleEventChange = (event) => {
    setSelectEvent(event.target.value);
  };

  // console.log(editData)
  const [formData, setFormData] = useState({
    title: "",
    customSlang: "",
    type: "",
    seatingTitle: "",
    standingTitle: "",
    ticketSold: "",
    eventImages: [
      {
        ImageURL: [],
        EventImagesType: 1,
        name: "Upload cover",
      },
      {
        ImageURL: [],
        EventImagesType: 2,
        name: "Upload thumbnail ",
      },
      {
        ImageURL: [],
        EventImagesType: 3,
        name: "Upload logo",
      },
      {
        ImageURL: [],
        EventImagesType: 4,
        name: "Upload social media images",
      },
      {
        ImageURL: [],
        EventImagesType: 5,
        name: "Upload tiles ",
      },
      {
        ImageURL: [],
        EventImagesType: 6,
        name: "Upload featured",
      },
    ],
  })
  const [formDataForExternalLinks, setFormDataForExternalLinks] = useState([
    {
      Id: 0,
      text: "",
      url: "",
      editorHtml: "",
      uploadImage: "",
      removeAdvertImage1: false,
      removeAdvertImage2: false,
      uploadAdvertImage1: "",
      uploadAdvertImage2: "",
      EventId: 0,
    },
  ])
  // console.log(formData.eventImages)
  const formats = ["header", "bold", "italic", "underline", "link", "image"]

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
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFields) => ({
      ...prevFields,
      [name]: value,
    }))
  }

  const handleInputChangerExternalLinks = (e, index) => {
    const updatedLinks = [...formDataForExternalLinks]
    updatedLinks[index] = {
      ...updatedLinks[index],
      [e.target.name]: e.target.value,
    }
    setFormDataForExternalLinks(updatedLinks)
  }

  const handleEditorChange = (html, index) => {
    const updatedLinks = [...formDataForExternalLinks]
    updatedLinks[index] = {
      ...updatedLinks[index],
      editorHtml: html,
    }
    setFormDataForExternalLinks(updatedLinks)
  }

  const updateImgState = (label, newImgValue, index) => {
    const updatedLinks = [...formDataForExternalLinks]
    updatedLinks[index] = {
      ...updatedLinks[index],
      [label]: newImgValue,
    }
    setFormDataForExternalLinks(updatedLinks)
  }

  const handleRemoveAdvertImage1 = (index) => {
    const updatedLinks = [...formDataForExternalLinks]
    if (updatedLinks[index].uploadAdvertImage1 !== "") {
      updatedLinks[index] = {
        ...updatedLinks[index],
        removeAdvertImage1: !updatedLinks[index].removeAdvertImage1,
        uploadAdvertImage1: "",
      }
      setFormDataForExternalLinks(updatedLinks)
    }
  }

  const handleRemoveAdvertImage2 = (index) => {
    const updatedLinks = [...formDataForExternalLinks]
    if (updatedLinks[index].uploadAdvertImage2 !== "") {
      updatedLinks[index] = {
        ...updatedLinks[index],
        removeAdvertImage2: !updatedLinks[index].removeAdvertImage2,
        uploadAdvertImage2: "",
      }
      setFormDataForExternalLinks(updatedLinks)
    }
  }
  const addExternalLinkField = () => {
    setFormDataForExternalLinks([
      ...formDataForExternalLinks,
      {
        Id: formDataForExternalLinks.length,
        text: "",
        url: "",
        editorHtml: "",
        uploadImage: "",
        removeAdvertImage1: false,
        removeAdvertImage2: false,
        uploadAdvertImage1: "",
        uploadAdvertImage2: "",
        EventId: 0,
      },
    ])
  }
  const handleSubmit = () => {
    const updatedFormData = { ...formData };
    updatedFormData.type = selectEvent;
    const eventDetails = {
      ...updatedFormData,
      // ...formData,
      EventExternalLink: formDataForExternalLinks,
      // Add other event details here
    }
    setEventDetail(eventDetails)

    handleNext()
  }
  useEffect(() => {
    if (editData) {
      const {
        data: { Title },
        eventDetails: {
          CustomSlang,
          SeatingTitle,
          StandingTitle,
          TicketSoldOutText,
        },
        eventImages,
        eventExternalLinks,
      } = editData
      const eventExternalLink = eventExternalLinks.map((link) => ({
        Id: link.Id,
        text: link.Text,
        url: link.URL,
        editorHtml: link.Discription,
        uploadImage: link.ImageURL,
        removeAdvertImage1: link.AdvertImageURL1 !== null,
        removeAdvertImage2: link.AdvertImageURL2 !== null,
        uploadAdvertImage1: link.AdvertImageURL1,
        uploadAdvertImage2: link.AdvertImageURL2,
        EventId: link.EventId,
      }))

      const updatedEventImages = formData.eventImages.map((formDataImage) => {
        const matchingImage = eventImages?.find(
          (image) => image.Type === formDataImage.EventImagesType
        )

        if (matchingImage) {
          // console.log("Matching Image Found:", matchingImage)
          return {
            ...formDataImage,
            ImageURL: [matchingImage.url], // Updating URL with the matched image URL
          }
        }

        return formDataImage
      })

      setFormData({
        title: Title,
        customSlang: CustomSlang,
        type: "",
        seatingTitle: SeatingTitle,
        standingTitle: StandingTitle,
        ticketSold: TicketSoldOutText,
        eventImages: updatedEventImages,
      })
      setFormDataForExternalLinks(eventExternalLink)
      // console.log(updatedEventImages)
      // console.log(updateEventImages)
    }
  }, [editData])
  return (
    <Grid container columnSpacing={4}>
      <Grid
        xs={12}
        sm={4}
        md={4}
        item
        sx={{
          mt: "40px",
        }}
      >
        <InputField
          label={"Title"}
          sx={{ width: "100%" }}
          name='title'
          value={formData.title}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        xs={12}
        sm={4}
        md={4}
        item
        sx={{
          mt: "40px",
        }}
      >
        <InputField
          label={"Custom slang (optional)"}
          sx={{ width: "100%" }}
          name='customSlang'
          value={formData.customSlang}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        sx={{
          // display: "flex",
          // justifyContent: "space-between",
          // alignItems: "center",
          mt: "40px",
        }}
      >
      <FormControl fullWidth>
      <Typography
        sx={{
          color: "#707070",
            fontSize: "14px",
            fontWeight: 400,
            ml: "1.5px",
            mb: "8px",
        }}
      >
        Type
      </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectEvent}
          onChange={handleEventChange}
          sx={{
            border: "1px solid  #FFFFFF",
            bgcolor: "white",
            borderRadius: "1rem",
            height: "48px",
            color: "#202020",
            "& .MuiSelect-icon": {
              color: "#2460B8",
              fontSize: "30px",
            },
          }}
        >
          {eventTypes?.map((item, index)=>(
            <MenuItem key={index} value={item?.TypeName}>{item?.TypeName}</MenuItem>
          ))}
        </Select>
      </FormControl>
        {/* 
        <Box sx={{ width: "515px" }}>
          <FormControlLabel
            sx={{
              // mr: "114px",
              mt: "2rem",
              // height:"100%",
              color: "#758895",
              "& .MuiTypography-root": {
                fontSize: "14px",
              },
            }}
            control={<Checkbox defaultChecked />}
            label='Attach tickets to order confirmation via email'
          />
        </Box> */}
      </Grid>
      
      {/* <Grid container spacing={"32px"} mt='32px'>
        {formData.eventImages?.map((eventImage, index) => {
          console.log("eventImage.ImageURL", eventImage.ImageURL)
          return (
            <Grid item md={4} key={index}>
              <DnDLabel lable={eventImage.name} />
              {eventImage.ImageURL.length !== 0 ? (
                <Box
                  component='img'
                  src={eventImage.ImageURL}
                  sx={{ width: "100%", height: "100%" }}
                />
              ) : (
                <DnDFile
                  style={{ width: "332px" }}
                  formData={formData}
                  setFormData={setFormData}
                  eventImageType={eventImage.EventImagesType}
                  imageTypeName={"eventsImage"}
                />
              )}
            </Grid>
          )
        })}
      </Grid> */}

      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          mt: "51px",
        }}
      >
        <InputField
          label={"Standing title"}
          sx={{ width: "100%" }}
          name='standingTitle'
          value={formData.standingTitle}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          mt: "51px",
        }}
      >
        <InputField
          label={"Seating title"}
          sx={{ width: "100%" }}
          name='seatingTitle'
          value={formData.seatingTitle}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          mt: "51px",
        }}
      >
        <InputField
          label={"Ticket sold out text (Optional)"}
          sx={{ width: "100%" }}
          name='ticketSold'
          value={formData.ticketSold}
          onChange={handleInputChange}
        />
      </Grid>

      {/* <InputField
          sx={{ width: "332px" }}
          label={"Ticket sold out text (Optional)"}
        /> */}

      <Grid item xs={12}>
        <Typography
          sx={{
            color: "#202020",
            fontSize: "18px",
            fontWeight: 500,
            mt: "56px",
          }}
        >
          External links
        </Typography>
      </Grid>
      {/* <Grid columnSpacing={4} container> */}
      {formDataForExternalLinks.map((link, index) => (
        <React.Fragment key={index}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mt: "21px",
            }}
          >
            <InputField
              sx={{ width: "100%" }}
              label={"Text"}
              name='text'
              value={link.text}
              onChange={(e) => handleInputChangerExternalLinks(e, index)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mt: "21px",
            }}
          >
            <InputField
              sx={{ width: "100%" }}
              label={"URL"}
              name='url'
              value={link.url}
              onChange={(e) => handleInputChangerExternalLinks(e, index)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mt: "21px",
            }}
          >
            <DnDLabel lable={"Upload image"} />
            <DnDFile
              label='uploadImage'
              updateImgState={(label, value) =>
                updateImgState(label, value, index)
              }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: "69px" }}>
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
              value={link.editorHtml}
              onChange={(html) => handleEditorChange(html, index)}
              styles={{ height: "170px", background: "white" }}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            item
            sx={{
              mt: "32px",
            }}
          >
            <DnDLabel lable={"Upload advert image 1"} />
            <DnDFile
              label='uploadAdvertImage1'
              updateImgState={(label, value) =>
                updateImgState(label, value, index)
              }
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            item
            sx={{
              mt: "51px",
            }}
          >
            <FormControlLabel
              sx={{
                color: "#758895",
                "& .MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
              control={
                <Checkbox
                  checked={link.removeAdvertImage1}
                  onChange={() => handleRemoveAdvertImage1(index)}
                  disabled={link.uploadAdvertImage1 === ""}
                />
              }
              label='Remove advert image 1'
            />
          </Grid>

          <Grid
            xs={12}
            sm={6}
            item
            sx={{
              mt: "51px",
            }}
          >
            <DnDLabel lable={"Upload advert image 2"} />
            <DnDFile
              label='uploadAdvertImage2'
              updateImgState={(label, value) =>
                updateImgState(label, value, index)
              }
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            item
            sx={{
              mt: "51px",
            }}
          >
            <FormControlLabel
              sx={{
                color: "#758895",
                "& .MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
              control={
                <Checkbox
                  checked={link.removeAdvertImage2}
                  onChange={() => handleRemoveAdvertImage2(index)}
                  disabled={link.uploadAdvertImage2 === ""}
                />
              }
              label='Remove advert image 2'
            />
          </Grid>
        </React.Fragment>
      ))}
      {/* </Grid> */}
      <Grid item xs={12} sx={{ mt: "47px" }}>
        <Button
          onClick={addExternalLinkField}
          sx={{
            color: "#2460B8",
            textTransform: "capitalize",
            fontSize: "16px",
            fontWeight: 400,
            "&.MuiButton-root:hover": {
              bgcolor: "transparent",
            },
          }}
          startIcon={
            <Box
              component='img'
              src={"/plusIcon.png"}
              sx={{ width: "14px", height: "14px" }}
            />
          }
        >
          Add more external links
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mt: "48px",
          mb: { xs: "30px", md: "190px" },
        }}
      >
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
