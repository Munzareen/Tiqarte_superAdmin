import { Box, Button, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ReactQuill from "react-quill"

import { venuesInputFields } from "../../../Common/Fields"

export const Notes = ({ handleNext, setNotes }) => {
  const [customerNotes, setCustomerNotes] = useState("")
  const handleEditorChange = (html) => {
    setCustomerNotes(html)
  }

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
  const formats = ["header", "bold", "italic", "underline", "link", "image"]
  const handleSubmit = (e) => {
    e.preventDefault()

    setNotes(customerNotes)
    handleNext()
  }
  return (
    <Grid
      container
      justifyContent='space-between'
      spacing={4}
      sx={{ mt: "1rem" }}
    >
      <Grid item xs={12}>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "14px",
            fontWeight: 400,
            pb: "8px",
          }}
        >
          Notes
        </Typography>
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={customerNotes}
          onChange={handleEditorChange}
          styles={{ height: "170px", background: "white" }}
        />
      </Grid>

      <Grid item xs={12} sx={{ my: "48px" }}>
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
