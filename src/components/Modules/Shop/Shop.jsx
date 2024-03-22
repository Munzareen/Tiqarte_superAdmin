import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import Table from "../../Common/Table"
import { ShopTable } from "./ShopTable/ShopTable"
import {
  useDeleteproductMutation,
  useGetAllProductsQuery,
} from "../../../store/services/Shop/shop.services"
import { useAuthRedirect } from "../../Common/authRedirect"

export const Shop = () => {
  const navigate = useNavigate()
  const { data: getAllProduct, isLoading, error } = useGetAllProductsQuery()

  const [deleteproduct, { isError, isSuccess, status, data }] =
    useDeleteproductMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = getAllProduct?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )
  const handleDelete = async (id) => {
    await deleteproduct(id)
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
            onClick={() => navigate("/shop/add-product")}
            sx={{
              color: "white",
              width: { lg: "211px" },
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
            add product
          </Button>
        </Box>
        {/* <Box sx={{ mt: "32px", display: "flex" }}>
          <Button
            sx={{
              color: "white",
              borderColor: "#FCA311",
              width: "184px",
              height: "56px",
              fontSize: "16px",
              fontWeight: 600,
              bgcolor: "#2460B8",
              textTransform: "capitalize",
              borderRadius: "16px",
              border: "1px soliid #FCA311",
              "&.MuiButton-root:hover": {
                //   boxShadow: "none",
                //   borderColor: "#FCA311",
                bgcolor: "#2460B8",
              },
            }}
          >
            Upcoming events
          </Button>
          <Button
            variant='outlined'
            sx={{
              color: "#969BA0",
              borderColor: "#F0F0F0",
              width: "132px",
              height: "56px",
              fontSize: "16px",
              fontWeight: 6400,
              textTransform: "capitalize",
              borderRadius: "16px",
              bgcolor: "white",
              ml: "8px",
              "&.MuiButton-root:hover": {
                borderColor: "#F0F0F0",
                bgcolor: "white",
              },
            }}
          >
            Past events
          </Button>
          <Button
            sx={{
              color: "#969BA0",
              borderColor: "#F0F0F0",
              width: "168px",
              height: "56px",
              fontSize: "16px",
              fontWeight: 400,
              bgcolor: "white",
              textTransform: "capitalize",
              borderRadius: "16px",
              ml: "8px",
              "&.MuiButton-root:hover": {
                borderColor: "#F0F0F0",
                bgcolor: "white",
              },
            }}
          >
            Archived events
          </Button>
        </Box> */}
        <ShopTable
          getAllProduct={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
