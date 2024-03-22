import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import Table from "../../Common/Table"
import { useNavigate } from "react-router-dom"
import { PromoterTable } from "./PromoterTable/PromoterTable"
import {
  useDeleteEventPromotorMutation,
  useGetAllEventPromotersQuery,
} from "../../../store/services/Promoters/Promoters.services"
import { useAuthRedirect } from "../../Common/authRedirect"
import { clearEditData } from "../../../store/slices/editDataSlice"
import { useDispatch } from "react-redux"

export const Promoters = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    data: allEventPromoter,
    error,
    isLoading,
  } = useGetAllEventPromotersQuery()

  const [deleteEventPromotor, { isError, isSuccess, status, data }] =
    useDeleteEventPromotorMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = allEventPromoter?.filter((row) =>
    row.Name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const handleDelete = async (id) => {
    await deleteEventPromotor(id)
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
              navigate("/promoters/create-promoter")
            }}
            sx={{
              color: "white",
              width: { lg: "250px" },
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
            Create promoter
          </Button>
        </Box>

        <PromoterTable
          allEventPromoter={filteredData}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      </Box>
    </Container>
  )
}
