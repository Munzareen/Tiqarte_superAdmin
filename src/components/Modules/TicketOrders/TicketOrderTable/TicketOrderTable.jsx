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
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModel"
import { Loader } from "../../../Common/Loader/Loader"

export const TicketOrderTable = ({ getAllOrder, isLoading, handleDelete }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  const handleOpenDeleteModal = (articleId) => {
    setItemToDelete(articleId)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      handleDelete(itemToDelete)
    }

    handleCloseDeleteModal()
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = getAllOrder?.slice(startIndex, endIndex)

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ my: "32px" }}
        id='ticketOrderTable'
      >
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
                <TableCell>Reference</TableCell>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Email</TableCell>
                <TableCell align='center'>Telephone</TableCell>
                <TableCell align='center'>Total ammount</TableCell>
                <TableCell align='center'>Completed at</TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell align='center'>Payment</TableCell>
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
                        #{row.OrderNo}
                      </TableCell>
                      <TableCell align='center' scope='row'>
                        {row.Name}
                      </TableCell>

                      <TableCell align='center'>{row.Email}</TableCell>
                      <TableCell align='center'>{row.Telephone}</TableCell>

                      <TableCell align='center'>${row.TotalAmount}</TableCell>
                      <TableCell align='center' sx={{minWidth:"120px"}}>
                        {dayjs(row.CompletedAt).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell align='center'>{row.Status}</TableCell>
                      <TableCell align='center'>{row.Payment}</TableCell>

                      <TableCell align='center' sx={{minWidth:"120px"}}>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/order/orderdetails")
                          }}
                          aria-label='edit'
                        >
                          <Box component='img' src='/editIcon.png' />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDeleteModal(row.Id)}
                          aria-label='delete'
                        >
                          <Box component='img' src='/deleteIcon.png' />
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
        count={getAllOrder?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
