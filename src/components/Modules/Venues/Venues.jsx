import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { VenueTable } from "./VenueTable/VenueTable"
import {
  useDeleteEventVenueMutation,
  useGetAllEventVenueQuery,
} from "../../../store/services/Veneus/Veneus.services"
import { useAuthRedirect } from "../../Common/authRedirect"
import { useDispatch } from "react-redux"
import { clearEditData } from "../../../store/slices/editDataSlice"

export const Venues = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: allEventVenue, error, isLoading } = useGetAllEventVenueQuery()
  const [deleteEventVenue, { isError, isSuccess, status, data }] =
    useDeleteEventVenueMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = allEventVenue?.filter((row) =>
  Object.values(row).some((value) => {
    // Check if the value is not null or undefined before calling toString
    if (value !== null && value !== undefined) {
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false; // Ignore null or undefined values
  })
);
  
  const handleDelete = async (id) => {
    await deleteEventVenue(id)
  }
  useAuthRedirect(error)
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
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
            placeHoder={"search"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={() => {
              dispatch(clearEditData())
              navigate("/venues/create-venue")
            }}
            sx={{
              color: "white",
              width: { lg: "211px" },
              height: "55px",
              fontSize: { xs: "12px", md: "14px", xl: "18px" },
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
            Create Vanue
          </Button>
        </Box>
        <VenueTable
          allEventVenue={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
