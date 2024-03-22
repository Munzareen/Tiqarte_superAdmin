import { Box, Button, Container } from "@mui/material"
import React, { useEffect, useState } from "react"
import SearchInput from "../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import {
  useDeleteCustomerMutation,
  useGetAllCustomersQuery,
} from "../../../store/services/Customer/Customer.services"
import { CustomerTable } from "./CustomerTable/CustomerTable"
import { CustomSelect } from "../../Common/CustomSelect"

const selectData = [
  { value: 1, label: "Paid" },
  { value: 2, label: "Un-Paid" },
]

export const Customers = () => {
  const [activeType, setActiveType] = useState("")
  const [allEvents, setAllEvents] = useState("")
  const [variants, setvariants] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [events,setEvents] = useState("")

  const navigate = useNavigate()
  const { data: customersData, isLoading } = useGetAllCustomersQuery()
  const [deleteCustomer, { isError, isSuccess, status, data }] =
    useDeleteCustomerMutation()

  const handleChangeEvent = (event) => {
      setEvents(event.target.value)
    }

  const handleActiveType = (event) => {
    setActiveType(event.target.value)
  }
  const handleAllEvents = (event) => {
    setAllEvents(event.target.value)
  }
  const handleVariants = (event) => {
    setvariants(event.target.value)
  }
  const filteredData = customersData?.filter((row) => {
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
    await deleteCustomer(id)
  }
  // useDeleteCustomerMutation
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
          <Box sx={{width:"100%"}}>
          <SearchInput
            sx={{ width: "48%", bgcolor: "white" }}
            placeHoder={"search"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CustomSelect
            sx={{ width: "180px", mt:4 }}
            handleChange={handleChangeEvent}
            label={"Active type"}
            value={events}
            data={selectData}
          />
          <CustomSelect
            sx={{ width: "180px", mt:4, ml:0.5 }}
            handleChange={handleChangeEvent}
            label={"All Events"}
            value={events}
            data={selectData}
          />
          </Box>
          <Button
            variant='contained'
            onClick={() => navigate("/customers/create-customer")}
            sx={{
              color: "white",
              width: { lg: "246px" },
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
                sx={{ width: "14px", height: "14 px", color: "white" }}
              />
            }
          >
            Create customer
          </Button>
        </Box>
        {/* <Box sx={{ mt: "32px", display: "flex" }}>
          <CustomSelect
            sx={{ width: "188px" }}
            handleChange={handleActiveType}
            label={"Active type"}
            value={activeType}
          />
          <CustomSelect
            sx={{ width: "188px" }}
            handleChange={handleAllEvents}
            label={"All events"}
            value={allEvents}
          />
          <CustomSelect
            sx={{ width: "188px" }}
            handleChange={handleVariants}
            label={"All variants"}
            value={variants}
          />
        </Box> */}

        <CustomerTable
          customersData={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
