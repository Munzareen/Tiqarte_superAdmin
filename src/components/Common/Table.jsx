import React, { useState } from "react"
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableSortLabel,
  Box,
  Menu,
  MenuItem,
} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const ActionDropdown = ({ row, actions, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={onClick}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const Table = ({ onClick, rows }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleEditClick = (row) => {
    console.log("Edit clicked for row:", row)
  }

  const handleHideClick = (row) => {
    console.log("Delete clicked for row:", row)
  }
  const handleDeleteClick = (row) => {
    console.log("Delete clicked for row:", row)
  }

  const actions = [
    {
      label: "Edit",
      onClick: handleEditClick,
    },
    {
      label: "Hide",
      onClick: handleHideClick,
    },
    {
      label: "Delete",
      onClick: handleDeleteClick,
    },
  ]

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <>
      <TableContainer sx={{ my: "32px" }}>
        <MuiTable>
          <TableHead>
            <TableRow sx={{ height: "72px", bgcolor: "#F0F4FA" }}>
              <TableCell>Referance</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Total amount</TableCell>
              <TableCell>Completed at</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.reference} sx={{ bgcolor: "white" }}>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: " #202020",
                  }}
                >
                  {row.reference}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: " #202020",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: " #202020",
                  }}
                >
                  {row.email}
                </TableCell>
                <TableCell>{row.telephone}</TableCell>
                <TableCell>{row.total_amount}</TableCell>
                <TableCell>{row.completed_at}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.payment}</TableCell>
                <TableCell>
                  <ActionDropdown
                    row={row}
                    actions={actions}
                    onClick={onClick}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        sx={{ mb: "32px" }}
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default Table
