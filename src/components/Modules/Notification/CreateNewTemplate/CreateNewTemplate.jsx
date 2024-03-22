import { Box, Grid, Typography } from "@mui/material"
import React from "react"
import { InputField } from "../../../Common/InputField"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"

export const CreateNewTemplate = () => {
  return (
    <Box sx={{ mt: "44px" }}>
      <Typography sx={{ color: "#202020", fontWeight: 500, fontSize: "22px" }}>
        Enter the details below
      </Typography>
      <Grid container>
        <Grid item md={6}>
          <InputField sx={{ width: "100%" }} />
        </Grid>
        <Grid item md={6}>
          <CustomSelectWithoutLabel sx={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Box>
  )
}
