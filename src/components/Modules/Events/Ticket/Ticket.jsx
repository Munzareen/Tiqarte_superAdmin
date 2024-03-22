import { Box, Button, MenuItem, Select } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { TicketTable } from "./TicketTable/TicketTable"
import {
  useDeleteEventVenueMutation,
  useGetAllEventVenueQuery,
} from "../../../../store/services/Veneus/Veneus.services"
import { useAuthRedirect } from "../../../Common/authRedirect"
import { useDeleteEventTicketMutation, useGetAllEventTicketsQuery } from "../../../../store/services/Events/event.services"

export const Ticket = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    data: allEventTickets,
    error,
    isLoading,
  } = useGetAllEventTicketsQuery()
  const [deleteEventTicket, { isError, isSuccess, status, data }] =
  useDeleteEventTicketMutation()
  const [searchQuery, setSearchQuery] = useState("")
  const mergedData = [];

  allEventTickets?.forEach(item => {
      const mergedItem = {
          ...item.EventTicektDetails, 
          ...item.EventTickets,      
      };
      mergedData.push(mergedItem);
  });

  const filteredData = mergedData?.filter((row) =>
  Object.values(row).some((value) =>
    value !== null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  )
);
  const handleDelete = async (id) => {
    await deleteEventTicket(id)
  }
  useAuthRedirect(error)
  return (
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
            // dispatch(clearEditData())
            navigate("/events/create-event-ticket")
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
          Create Tickets
        </Button>
        {/* <Select
          // classes={{ root: classes.select }}
          sx={{
            "& .MuiSelect-select": {
              width: "221px",
              // height: "26px",
              backgroundColor: "#2460B8",
              fontSize: 16,
              color: "white",
            },
          }}
          // specify selected value or set to empty string
        >
          <MenuItem value={"eng"}>Eng</MenuItem>
          <MenuItem value={"urd"}>jap</MenuItem>
        </Select> */}
      </Box>
      <TicketTable
        allEventVenue={filteredData}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
    </Box>
  )
}
