import React, { useState } from "react"
import { InputField } from "../../../Common/InputField"
import { Grid, Typography } from "@mui/material"
import ReactQuill from "react-quill"
export const CreateNotification = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isPointOfSaleUser: true,
    canReportOrders: true,
  })
  const [role, setRole] = useState("")
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
  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item md={12}>
        <InputField
          label={"Title"}
          sx={{ width: "100%" }}
          // name={field.name}
          // value={formData[field.name]}
          // onChange={handleInputChange}
        />
      </Grid>
      <Grid item md={5.5} sx={{ mt: "32px" }}>
        <InputField
          label={"Title"}
          sx={{ width: "100%" }}
          // name={field.name}
          // value={formData[field.name]}
          // onChange={handleInputChange}
        />
      </Grid>
      <Grid item md={5.5} sx={{ mt: "32px" }}>
        <InputField
          label={"Title"}
          sx={{ width: "100%" }}
          // name={field.name}
          // value={formData[field.name]}
          // onChange={handleInputChange}
        />
      </Grid>
      <Grid item md={12}>
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
            value={venueTextEditor}
            onChange={handleEditorChange}
            styles={{ height: "170px", background: "white" }}
          />
        </Grid>
    </Grid>
  )
}
