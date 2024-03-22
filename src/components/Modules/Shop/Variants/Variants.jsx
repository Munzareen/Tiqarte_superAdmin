import {
  Button,
  TextField as MuiTextField,
  FormControlLabel,
  Typography,
  Box,
  Checkbox,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material"
import React from "react"
import { InputField } from "../../../Common/InputField"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

export const Variants = ({ handleNext, handleBack, setVariants }) => {
  return (
    <>
      {/* <Box sx={{ width: "515px" }}>
        <FormControlLabel
          sx={{
            // mr: "114px",

            color: "#758895",
            "& .MuiTypography-root": {
              fontSize: "14px",
            },
          }}
          control={<Checkbox defaultChecked />}
          label='Enable passwords protection'
        />
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "32px",
        }}
      >
        <InputField sx={{ width: "314px" }} label={"Option"} />
        <InputField sx={{ width: "314px" }} label={"Price"} />
        <InputField sx={{ width: "314px" }} label={"Quantity"} />
        <IconButton aria-label='copy' sx={{ mt: "2rem" }}>
          <Box component='img' src='/deleteIcon.png' />
        </IconButton>
      </Box>
      <Box sx={{ width: "515px", mt: "14px" }}>
        <FormControlLabel
          sx={{
            // mr: "114px",

            color: "#758895",
            "& .MuiTypography-root": {
              fontSize: "14px",
            },
          }}
          control={<Checkbox defaultChecked />}
          label='Public'
        />
      </Box>

      <Button
        sx={{
          color: "#2460B8",
          textTransform: "capitalize",
          fontSize: "16px",
          fontWeight: 400,
          mt: "20px",
          "&.MuiButton-root:hover": {
            bgcolor: "transparent",
          },
        }}
        startIcon={
          <Box
            component='img'
            src={"/plusIcon.png"}
            sx={{ width: "14px", height: "14px" }}
          />
        }
      >
        Add more sponsors
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mt: "48px",
          mb: "190px",
        }}
      >
        <Button
          variant='contained'
          onClick={handleNext}
          sx={{
            color: "white",
            borderColor: "#FCA311",
            width: "332px",
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            border: "1px soliid #FCA311",
            "&.MuiButton-root:hover": {
              bgcolor: "#2460B8",
            },
          }}
        >
          Continue
        </Button>
        <Button
          variant='outlined'
          onClick={handleNext}
          sx={{
            color: "#404040",
            borderColor: "#404040",
            width: "332px",
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            textTransform: "capitalize",
            borderRadius: "16px",
            ml: "32px",
          }}
        >
          Skip
        </Button>
      </Box>
    </>
  )
}
