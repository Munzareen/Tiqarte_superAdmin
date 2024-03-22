import { Box, Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useDispatch, useSelector } from "react-redux"
import { DnDLabel } from "../../../Common/DnDLabel/DnDLabel"
import { DnDFile } from "../../../Common/DnDFile.jsx/DnDFile"
import { useEditHomePageMutation } from "../../../../store/services/Pages/Pages.services"
import { useNavigate } from "react-router-dom"

export const EditShopsPage = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    img: "",
  })
  const [editHomePage, { isSuccess }] = useEditHomePageMutation()
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const isEditing = !!editData
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isEditing) {
      const editedData = {
        Id: editData.Id,
        PageName: editData.PageName,
        Title: formData.title,
        ImageURL: formData.img,
      }
      await editHomePage(editedData)
      dispatch(clearEditData())
    }
  }
  useEffect(() => {
    if (isSuccess) {
      navigate("/pages")
    }
  }, [navigate, isSuccess])
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.PageName,
        img: editData.ImageURL,
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
        <DnDFile
      
          label='img'
          updateImgState={updateImgState}
        />
      </Box>

      <Box>
        <Box
          component='img'
          src={formData.img}
          sx={{ width: "278px", height: "258px", mt: "1rem" }}
        />
      </Box>
      <Box
        sx={{
          mt: "51px",
        }}
      >
        <InputField
          sx={{ width: "100%" }}
          label={"title"}
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
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
