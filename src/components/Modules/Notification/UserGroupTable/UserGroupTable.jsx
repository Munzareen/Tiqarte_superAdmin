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
export const UserGroupTable = ({ userGroupList, isLoading, handleDelete }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  console.log(userGroupList)
  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = userGroupList?.slice(startIndex, endIndex)
  // console.log(currentData)

  const stripStyles = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    const textContent = doc.body.textContent || ""
    return textContent
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ my: "32px" }}>
        {isLoading ? (
          <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
            Loading
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group name</TableCell>
                <TableCell align='center'>Location</TableCell>
                <TableCell align='center'>Criteria 1</TableCell>
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
                        {row.UserGroupTitle}
                      </TableCell>
                      <TableCell align='center'>{row.Location}</TableCell>
                      <TableCell align='center'>{row.Criteria}</TableCell>
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
        count={userGroupList?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </>
  )
}
