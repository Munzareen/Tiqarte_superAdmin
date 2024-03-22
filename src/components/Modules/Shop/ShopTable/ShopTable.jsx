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
import { setEditData } from "../../../../store/slices/editDataSlice"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModel"
import { Loader } from "../../../Common/Loader/Loader"

export const ShopTable = ({ getAllProduct, isLoading, handleDelete }) => {
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
  const currentData = getAllProduct?.slice(startIndex, endIndex)

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
                <TableCell>Product</TableCell>
                <TableCell align='center'>Published</TableCell>
                <TableCell align='center'>Price</TableCell>
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
                        {row.ProductName}
                      </TableCell>

                      <TableCell align='center'>
                        {" "}
                        {dayjs(row.CreatedDate).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell align='center'>{row.Price}</TableCell>

                      <TableCell align='center'>
                        {dayjs(row.CreatedDate).format("DD/MM/YYYY")}
                      </TableCell>

                      <TableCell align='center' sx={{width:"120px"}}>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/shop/add-product")
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
                          onClick={() => handleOpenDeleteModal(row.Id)}
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
        count={getAllProduct?.length}
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
