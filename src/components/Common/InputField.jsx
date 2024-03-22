import { Box, FormControl, FormLabel, OutlinedInput } from "@mui/material"

export const InputField = ({ label, type, field, form,onChange, value, name, onBlur, touched }) => {
  if(field){
    const { name, onBlur, onChange, value } = field
  }
  if(form){
    const { errors, touched } = form
  }
 
  return (
    <Box>
      <FormControl fullWidth>
        <FormLabel
          sx={{
            color: "#707070",
            fontSize: "14px",
            fontWeight: 400,
            ml: "1.5px",
            mb: "8px",
          }}
        >
          {label}
        </FormLabel>
        <OutlinedInput
          id={name}
          onChange={onChange}
          name={name}
          value={value}
          type={type?type:""}
          onBlur={onBlur}
          // error={touched[name] && Boolean(errors[name])}
          // helperText={touched[name] && errors[name]}
          sx={{
            "&.MuiOutlinedInput-root": {
              borderRadius: "1rem",
              height: "48px",
              border: "1px solid white",
              bgcolor: "white",
              color: "#202020",
            },
          }}
        />
      </FormControl>
    </Box>
  )
}
