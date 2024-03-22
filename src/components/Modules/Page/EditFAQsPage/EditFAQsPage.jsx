import { Box, Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import { useDispatch, useSelector } from "react-redux"
import { DnDFile } from "../../../Common/DnDFile.jsx/DnDFile"
import { DnDLabel } from "../../../Common/DnDLabel/DnDLabel"

export const EditFAQsPage = () => {
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  console.log(editData)
  const [formData, setFormData] = useState({
    title: "",
    img: "",
  })
  console.log(formData)
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.PageName,
        img: editData.ImageURL,
      })
    }
  }, [editData])
  return (
    <Box sx={{ mt: "32px" }}>
      <Typography sx={{ color: "#202020", fontWeight: 500, fontSize: "22px" }}>
        Header section
      </Typography>
      <Box sx={{ mt: "32px" }}>
        <DnDLabel lable={"Upload header"} />
        <DnDFile
          label='uploadheader'
          formData={formData}
          setFormData={setFormData}
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
