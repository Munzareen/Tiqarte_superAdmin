import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import Table from "../../Common/Table"
import { useNavigate } from "react-router-dom"
import { SeasonTicketsTable } from "./SeasonTicketsTable/SeasonTicketsTable"
import {
  useDeleteSeasonTicketMutation,
  useGetAllSeasonTicketsQuery,
} from "../../../store/services/SeasonTicket/SeasonTicket.services"
import { useDispatch } from "react-redux"
import { useAuthRedirect } from "../../Common/authRedirect"
export const Season = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: seasonTicketsData,
    error,
    isLoading,
  } = useGetAllSeasonTicketsQuery()
  const [deleteSeasonTicket, { isError, isSuccess, status, data }] =
    useDeleteSeasonTicketMutation()

  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = seasonTicketsData?.filter((row) => {
    return Object.values(row).some((value) => {
      // Check if the value is not null or undefined before calling toString()
      if (value !== null && value !== undefined) {
        return value
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      }
      return false // Handle null or undefined values as needed
    })
  })
 
  const handleDelete = async (id) => {
    await deleteSeasonTicket(id)
  }
  useAuthRedirect(error)
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth:"1440px"
        },
      }}
    >
      <Box sx={{ mt: "25px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchInput
            sx={{ width: "48%", bgcolor: "white" }}
            placeHoder={"Search discount codes"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={() => navigate("/seasons/create-season")}
            sx={{
              color: "white",
              width: { lg: "286px" },
              height: "55px",
              fontSize: { xs: "11px", md: "14px", lg: "18px" },
              fontWeight: 600,
              bgcolor: "#2460B8",
              textTransform: "capitalize",
              borderRadius: "16px",
              "&.MuiButton-root:hover": {
                // boxShadow: "none",
                bgcolor: "#2460B8",
              },
            }}
            startIcon={
              <Box
                component='img'
                src={"/addWhiteIcon.png"}
                sx={{ width: "14px", height: "14px", color: "white" }}
              />
            }
          >
            Create discount code
          </Button>
        </Box>

        <SeasonTicketsTable
          seasonTicketsData={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
