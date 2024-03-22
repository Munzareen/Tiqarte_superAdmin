import { Box } from "@mui/material"
import React from "react"

export const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 70, // Adjust the width as needed
        // Adjust the height as needed
        // backgroundImage: `url(./loading-icon.png)`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center",
        // margin: "auto",
        // mt:"5rem",
        animation: "spin 2s infinite linear",
        "@keyframes spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      }}
    >
      <Box
        component='img'
        src={"/loader.png"}
        sx={{
          mx: "auto",
          my: "auto",
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          // objectFit: "contain",
        }}
      />
    </Box>
  )
}
