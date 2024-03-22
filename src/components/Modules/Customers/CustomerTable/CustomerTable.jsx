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
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEditData } from "../../../../store/slices/editDataSlice"
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModel"
import { Loader } from "../../../Common/Loader/Loader"
export const CustomerTable = ({ customersData, isLoading, handleDelete }) => {
  // console.log("customersData", customersData)
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
    // Perform the actual delete action
    if (itemToDelete !== null) {
      handleDelete(itemToDelete)
    }

    // Close the delete confirmation modal
    handleCloseDeleteModal()
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = customersData?.slice(startIndex, endIndex)
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
                <TableCell>User</TableCell>
                <TableCell align='center'>Email</TableCell>
                <TableCell align='center'>Notes</TableCell>
                <TableCell align='center'>Created</TableCell>
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
                    <TableRow key={row.UserId}>
                      <TableCell
                        component='th'
                        scope='row'
                        // onClick={() => {
                        //   navigate(`/customers/edit/${row.UserId}`)
                        // }}
                      >
                        {row.User}
                      </TableCell>
                      <TableCell align='center'>{row.Email}</TableCell>
                      <TableCell align='center'>
                        {stripStyles(row.Notes)}
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(row.CreatedDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(row.LastUpdate).format("DD/MM/YYYY")}
                      </TableCell>

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            navigate(`/customers/edit/${row.UserId}`)
                          }}
                          aria-label='edit'
                        >
                          <Box component='img' src='/editIcon.png' />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDeleteModal(row.UserId)}
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
        count={customersData?.length}
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
