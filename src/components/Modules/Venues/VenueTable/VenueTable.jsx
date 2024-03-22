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
  Tooltip,
} from "@mui/material"
import dayjs from "dayjs"
import Cookies from "js-cookie"
import { Html } from "@mui/icons-material"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEditData } from "../../../../store/slices/editDataSlice"
import { Loader } from "../../../Common/Loader/Loader"
export const VenueTable = ({ allEventVenue, isLoading, handleDelete }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allEventVenue?.slice(startIndex, endIndex)
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
                <TableCell align='center'>Location</TableCell>
                <TableCell align='center'>Notes</TableCell>
                <TableCell align='center'>Last edited</TableCell>
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
                        {row.Name}
                      </TableCell>
                      <TableCell align='center'>{row.Location}</TableCell>
                      <TableCell align='center'>
                      <Tooltip title={stripStyles(row.Notes)}>
                          <Typography
                            sx={{
                              textOverflow: "ellipsis",
                              fontSize: "15px",
                              minWidth: "300px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "350px",
                            }}
                          >
                            {stripStyles(row.Notes)}
                          </Typography>
                        </Tooltip>
                        {/* {row.Notes.split(" ").slice(0, 4).join(" ")} */}
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(row.CreatedDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align='center' sx={{width:"120px"}}>
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
        count={allEventVenue?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </>
  )
}
