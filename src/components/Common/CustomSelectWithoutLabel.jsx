import { Box, FormControl, Select, Typography } from "@mui/material"

export const CustomSelectWithoutLabel = ({ field={}, sx, label, children }) => {
  const { name, value, onChange, onBlur } = field
  console.log("🚀 ~ file: CustomSelectWithoutLabel.jsx:5 ~ CustomSelectWithoutLabel ~ value:", value)

  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: "14px",
          color: "#707070",
        }}
      >
        {label}
      </Typography>
      <FormControl fullWidth sx={{ pt: "7px", ...sx }}>
        <Select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          displayEmpty
          error
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            borderRadius: "16px",
            border: "1px solid #FFFFFF",
            bgcolor: "white",
            height: "48px",
            "& .MuiSelect-icon": {
              color: "#2460B8",
              fontSize: "30px",
            },
          }}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  )
}
