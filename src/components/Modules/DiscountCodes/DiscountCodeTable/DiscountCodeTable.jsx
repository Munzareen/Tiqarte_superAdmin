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
export const DiscountCodeTable = ({
  allDiscounted,
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
  const currentData = allDiscounted?.slice(startIndex, endIndex)

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
                <TableCell>Code</TableCell>
                <TableCell align='center'>Amount in %</TableCell>
                <TableCell align='center'>Time used</TableCell>
                <TableCell align='center'>Schedule</TableCell>
                <TableCell align='center'>Conditional</TableCell>
                <TableCell align='center'>Auto-apply</TableCell>
                <TableCell align='center'>Valid from</TableCell>
                <TableCell align='center'>Valid to</TableCell>
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
                        {row.Code}
                      </TableCell>
                      <TableCell align='center'>{row.FixedAmount}</TableCell>
                      <TableCell align='center'>{row.UsageLimit}</TableCell>
                      <TableCell align='center'>{row.FixedAmount}</TableCell>
                      <TableCell align='center'>{row.FixedAmount}</TableCell>
                      <TableCell align='center'>
                        {row.AutoApply ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(row.ValidFromDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(row.ExpiryDate).format("DD MMM YYYY")}
                      </TableCell>

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/discount/create-discount-code")
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
        count={allDiscounted?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </>
  )
}
