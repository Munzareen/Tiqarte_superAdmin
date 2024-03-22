import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import Table from "../../Common/Table"
import { useNavigate } from "react-router-dom"
import { UserTable } from "./UserTable/UserTable"
import {
  useDeleteEventUserMutation,
  useGetAllEventUsersQuery,
} from "../../../store/services/Users/Users.services"
import { useAuthRedirect } from "../../Common/authRedirect"
import { useDispatch } from "react-redux"
import { clearEditData } from "../../../store/slices/editDataSlice"

export const Users = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: getAllEventUser, isLoading, error } = useGetAllEventUsersQuery()

  const [deleteEventUser, { isError, isSuccess, status, data }] =
    useDeleteEventUserMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = getAllEventUser?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )
  const handleDelete = async (id) => {
    await deleteEventUser(id)
  }
  useAuthRedirect(error)
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
        //  bgcolor:"red"
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
              navigate("/user/create-user")
            }}
            sx={{
              color: "white",
              width: { lg: "211px" },
              height: "55px",
              fontSize: { xs: "12px", md: "14px", lg: "18px" },
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
            Create user
          </Button>
        </Box>

        <UserTable
          getAllEventUser={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
