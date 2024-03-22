import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import React from "react"
import SearchInput from "../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import { TableComponent } from "../../Common/SortingTable"
import OutlinedInput from "@mui/material/OutlinedInput"
import { FormLabel } from "@mui/material"
import { useState } from "react"
const rows = [
  {
    reference: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    telephone: "+1 202674674",
    total_amount: "€76.00",
    completed_at: "21 Jan 2022",
    status: "Unpaid",
    payment: "Offline",
  },
  {
    reference: 2,
    name: "John Doe",
    email: "johndoe@example.com",
    telephone: "+1 202674674",
    total_amount: "€76.00",
    completed_at: "21 Jan 2022",
    status: "Unpaid",
    payment: "Offline",
  },

  // ... more rows
]

import Table from "../../Common/Table"
import { CustomSelect } from "../../Common/CustomSelect"
import { TicketOrderTable } from "./TicketOrderTable/TicketOrderTable"
import {PrintOrderTable} from "./TicketOrderTable/PrintOrderTable"
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "../../../store/services/Order/order.services"
import { useDispatch } from "react-redux"
import { useAuthRedirect } from "../../Common/authRedirect"

const selectData = [
  { value: 1, label: "Paid" },
  { value: 2, label: "Un-Paid" },
]

export const TicketOrders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [events, setEvents] = React.useState("")
  const [paymentSchedule, setPaymentSchedule] = React.useState("")
  const [paidPayment, setPaidPayment] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const { data: getAllOrderData, isLoading, error } = useGetAllOrderQuery()
  const [deleteOrder, { isError, isSuccess, status, data }] =
    useDeleteOrderMutation()
  //

  const handleChangeEvent = (event) => {
    setEvents(event.target.value)
  }

  const handleDelete = async (id) => {
    await deleteOrder(id)
  }
  const handleChangePaymentSchedule = (event) => {
    setPaymentSchedule(event.target.value)
  }
  const handleChangePaidPayment = (event) => {
    setPaidPayment(event.target.value)
  }

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=800")
    printWindow.document.open()
    printWindow.document.write(
      "<html><head><title>Print Tickets</title></head><body>"
    )
    printWindow.document.write("<h1>Tickets</h1>")
    printWindow.document.write(
      document.getElementById("printOrderTable").innerHTML
    )
    printWindow.document.write("</body></html>")
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
  }

  const filteredData = getAllOrderData?.filter((row) => {
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
          <Box sx={{width:"100%"}}>
          <SearchInput
            sx={{ width: "48%", bgcolor: "white",  }}
            placeHoder={"search"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CustomSelect
            sx={{ width: "200px", mt:4 }}
            handleChange={handleChangeEvent}
            label={"Paid Payments"}
            value={events}
            data={selectData}
          />
          </Box>
          <Button
            onClick={handlePrint}
            variant='contained'
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
                src={"/printerIcon.png"}
                sx={{ width: "22px", height: "22px", color: "white" }}
              />
            }
          >
            Print all tickets
          </Button>
        </Box>
        {/* <Box sx={{ mt: "32px", display: "flex" }}>
          <CustomSelect
            sx={{ width: "154px" }}
            handleChange={handleChangePaymentSchedule}
            label={"Schedule"}
            value={paymentSchedule}
          />
          <CustomSelect
            sx={{ width: "188px" }}
            handleChange={handleChangePaidPayment}
            label={"Paid payments"}
            value={paidPayment}
          />
        </Box> */}
        <PrintOrderTable
        getAllOrder={filteredData}
        isLoading={isLoading}
        handleDelete={handleDelete}
        />

        <TicketOrderTable
          getAllOrder={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
