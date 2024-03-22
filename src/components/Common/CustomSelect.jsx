import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React from "react"

export const CustomSelect = ({ label, handleChange, value, sx, data }) => {
  return (
    <FormControl fullWidth sx={{  ...sx }}>
      <InputLabel
        id='demo-simple-select-label'
        sx={{
          "&.MuiInputLabel-root": {
            color: "#2460B8",
            fontSize: "16px",
            fontWeight: 600,
            ml: "2px",
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value}
        label={label}
        onChange={handleChange}
        
        sx={{
          borderRadius: "16px",
          border: "1px solid  #FFFFFF",
          bgcolor: "white",
          "& .MuiSelect-icon": {
            color: "#2460B8",
            fontSize: "30px",
          },
        }}
      >
        {
          data?.map((item,index) => (
            <MenuItem key={index} value={item?.id??item?.Id}>{item?.label ?? item?.TypeName}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}
