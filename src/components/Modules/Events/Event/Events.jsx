import { Box, Button, Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchInput from "../../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import { TableComponent } from "../../../Common/SortingTable"
import { EventTable } from "./EventTable/EventTable"

import {
  useDeleteEventMutation,
  useGetAllEventQuery,
} from "../../../../store/services/Events/event.services"
import { useDispatch } from "react-redux"
import { useAuthRedirect } from "../../../Common/authRedirect"
export const Events = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [filter, setFilter] = useState("all")
  const { data: allEvents, error, isLoading } = useGetAllEventQuery()
  const [deleteEvent, { isError, isSuccess, status, data }] =
    useDeleteEventMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = allEvents?.filter((event) => {
    // Flatten the nested structure for simplicity
    const flattenedEvent = {
      ...event.data,
      ...event.eventDetails,
      // Add other nested properties as needed
    };
    
    // Check if any value in the flattened event includes the search query
    const isMatchSearchQuery = Object.values(flattenedEvent).some((value) =>
    value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filter === "all") {
      return isMatchSearchQuery;
    } else if (filter === "ongoing") {
      const today = new Date().toISOString().split("T")[0];
      const eventDate = event.data?.EventDate.split("T")[0];
      
      return isMatchSearchQuery && eventDate <= today;
    } else if (filter === "upcoming") {
      const today = new Date().toISOString().split("T")[0];
      const eventDate = event.data?.EventDate.split("T")[0];
      
      return isMatchSearchQuery && eventDate > today;
    }
    
    return false; // Default to false if filter is neither "all", "ongoing", nor "upcoming"
  });
  
  const handleDelete = async (id) => {
    await deleteEvent(id)
  }
  useAuthRedirect(error)

  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
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
            onClick={() => navigate("/events/create")}
            sx={{
              color: "white",
              width: { lg: "216px" },
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
            create event
          </Button>
        </Box>
        <Box sx={{ mt: "32px", display: "flex" }}>
          <Button
            variant='contained'
            onClick={() => setFilter("all")}
            sx={{
              color: "white",

              width: "56px",
              height: "56px",
              fontSize: "16px",
              fontWeight: 600,
              bgcolor: filter === "all" ? "#2460B8 " : "#F0F0F0",
              textTransform: "capitalize",
              borderRadius: "16px",

              "&.MuiButton-root:hover": {
                //   boxShadow: "none",
                //   borderColor: "#FCA311",
                bgcolor: filter === "all" ? "#2460B8 " : "#F0F0F0",
              },
            }}
          >
            all
          </Button>
          <Button
            variant='outlined'
            onClick={() => setFilter("ongoing")}
            sx={{
              color: "#969BA0",
              borderColor: "#F0F0F0",
              width: "108px",
              height: "56px",
              fontSize: "16px",
              fontWeight: 6400,
              textTransform: "capitalize",
              borderRadius: "16px",
              bgcolor: filter === "ongoing" ? "#2460B8 " : "#F0F0F0",
              ml: "8px",
              "&.MuiButton-root:hover": {
                borderColor: "#F0F0F0",
                bgcolor: filter === "ongoing" ? "#2460B8 " : "#F0F0F0",
              },
            }}
          >
            ongoing
          </Button>
          <Button
            onClick={() => setFilter("upcoming")}
            sx={{
              color: "#969BA0",
              borderColor: "#F0F0F0",
              width: "108px",
              height: "56px",
              fontSize: "16px",
              fontWeight: 400,
              bgcolor: filter === "upcoming" ? "#2460B8 " : "#F0F0F0",
              textTransform: "capitalize",
              borderRadius: "16px",
              ml: "8px",
              "&.MuiButton-root:hover": {
                borderColor: "#F0F0F0",
                bgcolor: filter === "upcoming" ? "#2460B8 " : "#F0F0F0",
              },
            }}
          >
            upcomming
          </Button>
        </Box>
        <EventTable
          allEvents={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
