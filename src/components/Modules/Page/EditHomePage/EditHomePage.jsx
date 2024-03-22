import { Box, Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useDispatch, useSelector } from "react-redux"
import { useEditHomePageHeaderMutation } from "../../../../store/services/Pages/Pages.services"
import { clearEditData } from "../../../../store/slices/editDataSlice"
import { useNavigate } from "react-router-dom"
import { DnDLabel } from "../../../Common/DnDLabel/DnDLabel"
import { DnDFile } from "../../../Common/DnDFile.jsx/DnDFile"
export const EditHomePage = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  console.log(editData)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    FromPrice: "",
    Link: "",
    HREF: "",
    HeaderURL: "",
    BannerURL: "",
    BackgroundURL: "",
  })
  const [editHomePageHeader, { isSuccess: editSuccess }] =
    useEditHomePageHeaderMutation()
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isEditing) {
      const editedData = {
        Id: editData.Id,
        title: formData.title,
        content: formData.Content,
        FromPrice: formData.FromPrice,
        Link: formData.Link,
        HREF: formData.HREF,
        HeaderURL: formData.HeaderURL,
        BannerURL: formData.BannerURL,
        BackgroundURL: formData.BackgroundURL,
      }
      await editHomePageHeader(editedData)
      dispatch(clearEditData())
    }
  }
  useEffect(() => {
    if (editSuccess) {
      navigate("/pages")
    }
  }, [navigate, editSuccess])
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.Title,
        content: editData.Content,
        FromPrice: editData.FromPrice,
        Link: editData.Link,
        HREF: editData.HREF,
        HeaderURL: editData.HeaderURL,
        BannerURL: editData.BannerURL,
        BackgroundURL: editData.BackgroundURL,
      })
    }
  }, [editData])
  const updateImgState = (label, newImgValue) => {
    setFormData({
      ...formData,
      [label]: newImgValue,
    })
  }
  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: "32px" }}>
      <Typography sx={{ color: "#202020", fontWeight: 500, fontSize: "22px" }}>
        Header section
      </Typography>
      <Box sx={{ mt: "32px" }}>
        <DnDLabel lable={"Upload header"} />
        <DnDFile label='HeaderURL' updateImgState={updateImgState} />
      </Box>
      <Box>
        <Box
          component='img'
          src={formData.HeaderURL}
          sx={{ mt: "1rem", width: "170px", height: "170px" }}
        />
      </Box>
      <Box sx={{ mt: "32px" }}>
        <DnDLabel lable={"Upload banner"} />
        <DnDFile label='BannerURL' updateImgState={updateImgState} />
      </Box>
      <Box>
        <Box
          component='img'
          src={formData.BannerURL}
          sx={{ mt: "1rem", width: "170px", height: "170px" }}
        />
      </Box>
      <Box sx={{ mt: "32px" }}>
        <DnDLabel lable={"Upload background"} />
        <DnDFile label='BackgroundURL' updateImgState={updateImgState} />
      </Box>
      <Box>
        <Box
          component='img'
          src={formData.BackgroundURL}
          sx={{ mt: "1rem", width: "170px", height: "170px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "51px",
        }}
      >
        <InputField
          sx={{ width: "332px" }}
          label={"Title"}
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        <InputField
          sx={{ width: "332px" }}
          label={"Content"}
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
        />
        <InputField
          sx={{ width: "332px" }}
          label={"From price"}
          value={formData.FromPrice}
          onChange={(e) => handleInputChange("FromPrice", e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "51px",
        }}
      >
        <InputField
          sx={{ width: "512px" }}
          label={"Link"}
          value={formData.Link}
          onChange={(e) => handleInputChange("Link", e.target.value)}
        />
        <InputField
          sx={{ width: "512px" }}
          label={"HREF"}
          value={formData.HREF}
          onChange={(e) => handleInputChange("HREF", e.target.value)}
        />
      </Box>
      <Button
        type='submit'
        sx={{
          color: "white",
          width: { lg: "211px" },
          height: "55px",
          fontSize: { xs: "12px", md: "14px", lg: "18px" },
          fontWeight: 600,
          bgcolor: "#2460B8",
          textTransform: "capitalize",
          borderRadius: "16px",
          mt: "48px",
          "&.MuiButton-root:hover": {
            // boxShadow: "none",
            bgcolor: "#2460B8",
          },
        }}
      >
        Save changes
      </Button>
    </Box>
  )
}
