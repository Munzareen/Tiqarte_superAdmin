import React from "react"
import { Box, IconButton, InputBase, Paper } from "@mui/material"

export default function SearchInput({ sx, placeHoder, value, onChange }) {
  return (
    <Paper
      component='form'
      sx={{
        display: "flex",
        alignItems: "center",
        height: "56px",
        borderRadius: "16px",
        boxShadow: "none",
        ...sx,
      }}
    >
      <InputBase
        sx={{ ml: "24px", flex: 1, boxShadow: "none" }}
        placeholder={placeHoder}
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
      />
      {/* <IconButton type='button' sx={{ p: "10px" }} aria-label='search'> */}
      <Box
        component='img'
        src='/searchIcon.png'
        sx={{ width: "20px", mr: "20px" }}
      />
      {/* </IconButton> */}
    </Paper>
  )
}
