import { Button, Box, Typography, Grid } from "@mui/material"
import React, { useEffect, useState } from "react"
import { DragandDropLable } from "../DragandDropLable"
import { DragDropFile } from "../DragAndDropField"
import { InputField } from "../../../../Common/InputField"
import { useSelector } from "react-redux"

export const SponsorsDetail = ({
  handleNext,
  handleBack,
  setSponsorsDetail,
}) => {
  const editData = useSelector((state) => state?.editData)
  console.log(editData)
  const [formData, setFormData] = useState([
    {
      Id: 0,
      title: "",
      uploadImage: null,
      EventId: 0,
    },
  ])
  console.log(formData)

  const handleInputChange = (event, index) => {
    const { name, value } = event.target
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData]
      updatedFormData[index][name] = value
      return updatedFormData
    })
  }

  const handleImageChange = (identifier, image, index) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData]
      updatedFormData[index].uploadImage = image
      return updatedFormData
    })
  }

  const handleSubmit = () => {
    setSponsorsDetail(formData)
    handleNext()
  }
  const handleAddSponsor = () => {
    const newId = formData.length // Use the length of formData as the new Id
    setFormData((prevFormData) => [
      ...prevFormData,
      {
        Id: newId,
        title: "",
        uploadImage: null,
        EventId: 0,
      },
    ])
  }
  const handleDeleteSponsor = (id) => {
    setFormData((prevFormData) =>
      prevFormData.filter((sponsor) => sponsor.Id !== id)
    )
  }
  const isSponsorComplete = (sponsor) => {
    return sponsor.title && sponsor.uploadImage
  }
  const completedSponsors = formData?.filter(isSponsorComplete)
  useEffect(() => {
    // const { sponsors } = editData

    const updateSponsors = editData?.sponsors?.map((spon) => {
      return {
        Id: spon.Id,
        title: spon.Name,
        uploadImage: spon.ImageURL, 
        EventId: 0,
      }
    })
    setFormData(updateSponsors)
  }, [editData])

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={12}>
        <Typography
          sx={{
            color: " #758895",
            fontWeight: 400,
            fontSize: "14px",
            mt: "4px",
          }}
        >
          If you would like to add sponsors logo to event page them add them
          here.
        </Typography>
      </Grid>

      {/* <Grid container> */}
      {completedSponsors?.length > 0 && (
        <Grid item xs={12}>
          <SponsorsCard
            data={completedSponsors}
            onDelete={handleDeleteSponsor}
          />
        </Grid>
      )}
      {/* </Grid> */}
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "32px",
        }}
      > */}
      {formData?.map((sponsor, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6} sx={{ mt: "28px" }}>
            <InputField
              label={"Name"}
              sx={{ width: "100%" }}
              name='title'
              value={sponsor.title}
              onChange={(event) => handleInputChange(event, index)}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mt: "28px" }}>
            <DragandDropLable lable={"Upload images"} />
            <DragDropFile
              style={{ width: "100%" }}
              onImageChange={(identifier, image) =>
                handleImageChange(identifier, image, index)
              }
              identifier='uploadImage'
            />
          </Grid>
        </React.Fragment>
      ))}
      {/* </Box> */}
      <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
        <Button
          onClick={handleAddSponsor}
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
          Add more sponsors
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: "48px",
          mb: "190px",
        }}
      >
        <Button
          variant='contained'
          onClick={handleSubmit}
          sx={{
            color: "white",
            borderColor: "#FCA311",
            width: { xs: "100%", sm: "332px" },
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
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
          Continue
        </Button>
        <Button
          variant='outlined'
          onClick={handleNext}
          sx={{
            color: "#404040",
            borderColor: "#404040",
            width: { xs: "100%", sm: "332px" },
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            textTransform: "capitalize",
            borderRadius: "16px",
            ml: "32px",
          }}
        >
          Skip
        </Button>
      </Grid>
      {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant='contained' onClick={handleBack}>
          Back
        </Button>
        <Button variant='contained' onClick={handleNext}>
          Continue
        </Button>
      </Box> */}
    </Grid>
  )
}

export const SponsorsCard = ({ data, onDelete }) => {
  return (
    data && (
      <Box
        sx={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        {data.map((data, index) => {
          return (
            <Box sx={{ mt: "32px" }}>
              <Typography
                key={index}
                sx={{ color: "#707070", fontWeight: 400, fontSize: "14px" }}
              >
                Logo{index}
              </Typography>
              <Box
                sx={{
                  border: "1px solid #CFCFCF",
                  width: "100%",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: "24px",
                  py: "8px",
                  mt: "8px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {data.uploadImage && ( // Render the image if it exists
                    <Box
                      component='img'
                      src={data.uploadImage}
                      alt={`Logo ${index}`}
                      sx={{ width: "20px", height: "20px" }}
                    />
                  )}
                  <Typography
                    sx={{
                      color: "#202020",
                      fontWeight: 500,
                      fontSize: "16px",
                      ml: "12px",
                    }}
                  >
                    {data.title}
                  </Typography>
                </Box>
                <Box
                  component='img'
                  src='/deleteIcon.png'
                  sx={{ width: "18px", height: "20px", cursor: "pointer" }}
                  onClick={() => onDelete(index)}
                />
              </Box>
            </Box>
          )
        })}
      </Box>
    )
  )
}
