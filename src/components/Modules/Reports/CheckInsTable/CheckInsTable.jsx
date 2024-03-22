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
  Container,
} from "@mui/material"
import dayjs from "dayjs"
import Cookies from "js-cookie"
import { Html } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useGetCheckInsReportQuery } from "../../../../store/services/Reports/Report.services"

export const CheckInsTable = () => {
  const { data: checkIns, isLoading } = useGetCheckInsReportQuery()
  // console.log(data)
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = checkIns?.slice(startIndex, endIndex)
  // console.log(currentData)
  // const handleDelete = (id) => {
  //   allArticles
  //     ?.slice()
  //     .reverse()
  //     .filter((row) => row.id !== id)
  // }
  const stripStyles = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    const textContent = doc.body.textContent || ""
    return textContent
  }
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
        },
      }}
    >
      <TableContainer component={Paper} sx={{ my: "32px" }}>
        {isLoading ? (
          <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
            Loading
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order date</TableCell>
                <TableCell align='center'>Order no</TableCell>
                <TableCell align='center'>Checked in</TableCell>
                <TableCell align='center'>Checked-in-count</TableCell>
                <TableCell align='center'>Checked-in-time</TableCell>
                <TableCell align='center'>Ticket type</TableCell>
                <TableCell align='center'>Block</TableCell>
                <TableCell align='center'>Row</TableCell>
                <TableCell align='center'>Seat</TableCell>
                <TableCell align='center'>Scanee</TableCell>
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
                        {row.Name}
                      </TableCell>
                      <TableCell align='center'>{row.Location}</TableCell>
                      <TableCell align='center'>
                        {stripStyles(row.Notes)}
                        {/* {row.Notes.split(" ").slice(0, 4).join(" ")} */}
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(row.CreatedDate).format("DD/MM/YYYY")}
                      </TableCell>

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/venues/create-venue")
                          }}
                          aria-label='edit'
                        >
                          <Box
                            component='img'
                            src='/editIcon.png'
                            sx={{ mr: "0.5rem" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(row.Id)}
                          aria-label='delete'
                        >
                          <Box
                            component='img'
                            src='/deleteIcon.png'
                            sx={{ ml: "0.5rem" }}
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
        count={checkIns?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </Container>
  )
}
