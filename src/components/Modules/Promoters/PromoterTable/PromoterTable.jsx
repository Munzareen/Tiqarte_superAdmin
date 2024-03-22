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
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEditData } from "../../../../store/slices/editDataSlice"
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModel"
import { Loader } from "../../../Common/Loader/Loader"
export const PromoterTable = ({
  allEventPromoter,
  isLoading,
  handleDelete,
}) => {
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
  const currentData = allEventPromoter?.slice(startIndex, endIndex)

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
                <TableCell align='left'>Promoters</TableCell>
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData
                ?.slice()
                .reverse()
                .map((row) => {
                  return (
                    <TableRow key={row.Id} >
                      <TableCell
                        component='th'
                        scope='row'
                        align='left'
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          // justifyContent: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <img src={row.ImageUrl} height={50} width={50} />
                        {row.Name}
                      </TableCell>

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/promoters/create-promoter")
                          }}
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
        count={allEventPromoter?.length}
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
