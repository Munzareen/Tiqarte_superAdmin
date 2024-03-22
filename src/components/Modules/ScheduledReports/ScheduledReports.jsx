import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import Table from "../../Common/Table"
import { useNavigate } from "react-router-dom"
import { ScheduleTable } from "./ScheduleTable/ScheduleTable"
import { useDispatch } from "react-redux"
import {
  useDeleteScheduledReportMutation,
  useGetAllScheduleReportsQuery,
} from "../../../store/services/ScheduleReport/ScheduleReport.services"
import { useAuthRedirect } from "../../Common/authRedirect"
const rows = [
  {
    Promoters: "National football league",
  },
  {
    Promoters: "Indian premiere league",
  },
  {
    Promoters: "Major premiere league",
  },

  // ... more rows
]
export const ScheduledReports = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const {
    data: allScheduleReports,
    error,
    isLoading,
  } = useGetAllScheduleReportsQuery()
  const [deleteScheduledReport, { isError, isSuccess, status, data }] =
    useDeleteScheduledReportMutation()

  const filteredData = allScheduleReports?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleDelete = async (id) => {
    await deleteScheduledReport(id)
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
            placeHoder={"Search discount codes"}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={() => navigate("/scheduled/create-schedule")}
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
            Create schedule report
          </Button>
        </Box>
        <ScheduleTable
          allScheduleReports={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
