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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@mui/material"
import dayjs from "dayjs"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEditData } from "../../../../store/slices/editDataSlice"
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModel"
import { Loader } from "../../../Common/Loader/Loader"
export const ArticleTable = ({ allArticles, isLoading, handleDelete }) => {
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

    // Close the delete confirmation modal
    handleCloseDeleteModal()
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const itemsPerPage = 5
  const startIndex = page * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = allArticles?.slice(startIndex, endIndex)

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
          <Table sx={{ overflowX: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Title</TableCell>
                <TableCell align='center'>Published</TableCell>
                <TableCell align='center'> Scheduled Time</TableCell>
                {/* <TableCell align='center'>Last Time Edited</TableCell> */}
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData
                ?.slice()
                .reverse()
                .map((row) => {
                  return (
                    <TableRow key={row.ArticleId}>
                      <TableCell >
                        <img src={row.ImageUrl} alt="articleImg" style={{width:"50px"}}/>
                      </TableCell>
                      <TableCell >
                        <Typography sx={{
                              textOverflow: "ellipsis",
                              minWidth: "300px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "380px",
                            }}>
                          {row.Title}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        {row.Published ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align='center'>
                         {row.Scheduled.split(' ')[0]}
                      </TableCell>

                      <TableCell align='center' sx={{minWidth:"120px"}}>
                        <IconButton
                          onClick={() => {
                            dispatch(setEditData(row))
                            navigate("/articles/create-article")
                          }}
                          aria-label='edit'
                        >
                          <Box
                            component='img'
                            src='/editIcon.png'
                            // sx={{ mr: "0.5rem" }}
                          />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDeleteModal(row.ArticleId)}
                          aria-label='delete'
                        >
                          <Box
                            component='img'
                            src='/deleteIcon.png'
                            // sx={{ ml: "0.5rem" }}
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
        count={allArticles?.length}
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
