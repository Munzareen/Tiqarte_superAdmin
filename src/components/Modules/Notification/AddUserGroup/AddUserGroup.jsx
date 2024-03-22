import { Box, Button, Grid, Typography } from "@mui/material"
import React from "react"
import { InputField } from "../../../Common/InputField"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"

export const AddUserGroup = () => {
  return (
    <Box sx={{ mt: "44px" }}>
      <Typography sx={{ color: "#202020", fontWeight: 500, fontSize: "22px" }}>
        Enter the details below
      </Typography>
      <Grid container sx={{ mt: "24px" }}>
        <Grid item md={6}>
          <InputField label={"Title"} sx={{ width: "100%" }} />
        </Grid>
        <Grid item md={6}>
          <InputField label={"Location"} sx={{ width: "100%" }} />
        </Grid>
        <Grid item md={12} sx={{ mt: "24px" }}>
          <CustomSelectWithoutLabel fieldName={"Select user type"} />
        </Grid>
        <Grid item md={12} sx={{ mt: "24px" }}>
          <InputField label={"Criteria 1 (optional)"} sx={{ width: "100%" }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}>
            <Button>+Add more criterias</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
