import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { InputField } from '../../../Common/InputField'
import { DnDLabel } from '../../../Common/DnDLabel/DnDLabel'
import { DnDFile } from '../../../Common/DnDFile.jsx/DnDFile'

export const EditPrivacyPolicyPage = () => {
  const [formData, setFormData] = useState({
    title: "",
  })

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  return (
    <Box sx={{ mt: "32px" }}>
      <Typography sx={{ color: "#202020", fontWeight: 500, fontSize: "22px" }}>
        Header section
      </Typography>
      <Box sx={{ mt: "32px" }}>
        <DnDLabel lable={"Upload background"} />
        <DnDFile
          label='uploadBackground'
          formData={formData}
          setFormData={setFormData}
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
