import React, { useState } from "react"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { DateField } from "@mui/x-date-pickers"
export default function InputDateAndTimePicker({ field, fieldType, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[field]}
        sx={{
          "&.MuiStack-root": {
            pt: 0,
          },
        }}
      >
        <DemoItem label={label}>{fieldType}</DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  )
}
