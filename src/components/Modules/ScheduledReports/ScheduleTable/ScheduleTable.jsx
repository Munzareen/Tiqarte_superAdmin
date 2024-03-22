import React from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  TablePagination,
} from "@mui/material"
import dayjs from "dayjs"
import Cookies from "js-cookie"
import { Html } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEditData } from "../../../../store/slices/editDataSlice"
import { Loader } from "../../../Common/Loader/Loader"
export const ScheduleTable = ({
  allScheduleReports,
  isLoading,
  handleDelete,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allScheduleReports?.slice(startIndex, endIndex)

  return (
    <>
      <TableContainer component={Paper} sx={{ my: "32px" }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // height: "80vh",
            }}
          >
            <Loader />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align='center'>Type</TableCell>
                <TableCell align='center'>Recipients</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData
                ?.slice()
                .reverse()
                .map((row) => {
                  return (
                    <TableRow key={row.Id}>
                      <TableCell component='th' scope='row'>
                        {row.ScheduledReportName}
                      </TableCell>
                      <TableCell align='center'>{row.DayofWeek} Days</TableCell>
                      <TableCell align='center'>
                        {row.ReportScheduled}
                      </TableCell>

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/scheduled/create-schedule")
                          }}
                          aria-label='edit'
                        >
                          <Box
                            component='img'
                            src='/editIcon.png'
                        
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(row.Id)}
                          aria-label='delete'
                        >
                          <Box
                            component='img'
                            src='/deleteIcon.png'
                          
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        component='div'
        count={allScheduleReports?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </>
  )
}
