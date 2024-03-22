import { Typography } from "@mui/material"
import React from "react"
export const DnDLabel = ({ lable }) => {
  return (
    <Typography
      sx={{
        mb: "8px",
        color: "#707070",
        fontWeight: 400,
        fontSize: "14px",
      }}
    >
      {lable}
    </Typography>
  )
}
