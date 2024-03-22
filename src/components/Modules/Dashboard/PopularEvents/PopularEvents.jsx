import { Box, Typography } from "@mui/material"
import React from "react"
const events = [
  {
    id: 1,
    eventName: "Beautiful Fireworks Shows In The New Year 2021",
    ticketSold: 1054,
  },
  {
    id: 2,
    eventName: "Jakarta Indie Music Festival 2020",
    ticketSold: 1054,
  },
  {
    id: 3,
    eventName: "NFT Arts exhibitions ",
    ticketSold: 1054,
  },
  {
    id: 4,
    eventName: "NFT Arts exhibitions ",
    ticketSold: 1054,
  },
  {
    id: 5,
    eventName: "NFT Arts exhibitions ",
    ticketSold: 1054,
  },
  {
    id: 6,
    eventName: "NFT Arts exhibitions ",
    ticketSold: 1054,
  },
  {
    id: 7,
    eventName: "NFT Arts exhibitions ",
    ticketSold: 1054,
  },
]
export const PopularEvents = ({ getPopularEventsDashboard, formData }) => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: "16px",
        mt: "32px",
        height:"100%"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: "24px",
          mb: "41px",
        }}
      >
        <Typography
          sx={{
            color: "#404040",
            fontSize: "22px",
            fontWeight: 600,
            ml: "24px",
          }}
        >
          Popular Events
        </Typography>
        <Typography
          sx={{
            color: "#969BA0",
            fontSize: "14px",
            fontWeight: 500,
            mr: "12px",
          }}
        >
          From {formData.dateFrom} to {formData.dateTo}{" "}
        </Typography>
      </Box>
      {getPopularEventsDashboard?.map((data, i) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",

                mx: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    border: "1px solid #2460B8",
                    px: "17px",
                    py: "16px",
                    borderRadius: "16px",
                  }}
                >
                  #{data.id}
                </Typography>
                <Typography
                  sx={{
                    width: "292px",
                    ml: "20px",
                    color: "#404040",
                  }}
                >
                  {data.EventName}
                </Typography>
              </Box>
              <Box>
                <Typography>{data.TicketsSold}</Typography>
                <Typography>Ticket sold</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                border: "1px solid #CFCFCF",
                mt: "17px",
                mb: "20px",
                mx: "20px",
              }}
            />
          </>
        )
      })}
    </Box>
  )
}
