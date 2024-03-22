import React, { useState } from "react"
import { Box, Button, Container } from "@mui/material"
import SearchInput from "../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import Table from "../../Common/Table"
import {
  useDeleteDiscountCodeMutation,
  useGetAllDiscountCodeQuery,
} from "../../../store/services/DiscountCode/discountCode.services"
import { DiscountCodeTable } from "./DiscountCodeTable/DiscountCodeTable"
import { useAuthRedirect } from "../../Common/authRedirect"
import { useDispatch } from "react-redux"
import { clearEditData } from "../../../store/slices/editDataSlice"

export const DiscountCodes = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: allDiscounted, error, isLoading } = useGetAllDiscountCodeQuery()
  const [deleteDiscountCode] = useDeleteDiscountCodeMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = allDiscounted?.filter((row) =>
    Object.values(row).some((value) => {
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    })
  )
  
  const handleDelete = async (id) => {
    await deleteDiscountCode(id)
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
            placeHoder={"Search "}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={() => {
              dispatch(clearEditData())
              navigate("/discount/create-discount-code")
            }}
            sx={{
              color: "white",
              width: { lg: "311px" },
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

        <DiscountCodeTable
          allDiscounted={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
