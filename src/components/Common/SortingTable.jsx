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
} from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

const dummyData = [
  {
    id: 1,
    title: "First row title",
    published: "Yes",
    date: "2022-01-01",
    lastEdit: "2022-02-01",
  },
  {
    id: 2,
    title: "Second row title",
    published: "No",
    date: "2022-02-15",
    lastEdit: "2022-03-01",
  },
  {
    id: 3,
    title: "Third row title",
    published: "Yes",
    date: "2022-04-01",
    lastEdit: "2022-05-01",
  },
  {
    id: 4,
    title: "Fourth row title",
    published: "No",
    date: "2022-06-15",
    lastEdit: "2022-07-01",
  },
  {
    id: 5,
    title: "Fifth row title",
    published: "Yes",
    date: "2022-08-01",
    lastEdit: "2022-09-01",
  },
  {
    id: 6,
    title: "Sixth row title",
    published: "No",
    date: "2022-10-15",
    lastEdit: "2022-11-01",
  },
  {
    id: 7,
    title: "Seventh row title",
    published: "Yes",
    date: "2022-12-01",
    lastEdit: "2023-01-01",
  },
  {
    id: 8,
    title: "Eighth row title",
    published: "No",
    date: "2023-02-15",
    lastEdit: "2023-03-01",
  },
  {
    id: 9,
    title: "Ninth row title",
    published: "Yes",
    date: "2023-04-01",
    lastEdit: "2023-05-01",
  },
  {
    id: 10,
    title: "Tenth row title",
    published: "No",
    date: "2023-06-15",
    lastEdit: "2023-07-01",
  },
  {
    id: 11,
    title: "Eleventh row title",
    published: "Yes",
    date: "2023-08-01",
    lastEdit: "2023-09-01",
  },
  {
    id: 12,
    title: "Twelfth row title",
    published: "No",
    date: "2023-10-15",
    lastEdit: "2023-11-01",
  },
]

const headCells = [
  { id: "title", label: "Title" },
  { id: "published", label: "Published" },
  {
    id: "date",
    label: "Date",
    sortable: true,
  },
  { id: "lastEdit", label: "Last Edit" },
  { id: "actions", label: "Actions" },
]
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}
const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              bgcolor: "#F0F4FA",
              height: 72,
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
export function TableComponent() {
  // const classes = useStyles();
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("date")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(7)
  const [rows, setRows] = useState(dummyData)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleEdit = (id) => {
    console.log(`Editing row with id ${id}`)
  }

  const handleDelete = (id) => {
    console.log(`Deleting row with id ${id}`)
  }

  const handleCopy = (id) => {
    console.log(`Copying row with id ${id}`)
  }

  return (
    <>
      <TableContainer sx={{ my: "32px" }}>
        <MuiTable>
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody sx={{ bgcolor: "white" }}>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover key={row.id} sx={{ fontWeight: 900 }}>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: " #202020",
                      }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: " #202020",
                      }}
                    >
                      {row.published}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: " #202020",
                      }}
                    >
                      {row.date}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: " #202020",
                      }}
                    >
                      {row.lastEdit}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(row.id)}
                        aria-label='edit'
                      >
                        <Box component='img' src='/editIcon.png' />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(row.id)}
                        aria-label='delete'
                      >
                        <Box component='img' src='/copyIcon.png' />
                      </IconButton>
                      <IconButton
                        onClick={() => handleCopy(row.id)}
                        aria-label='copy'
                      >
                        <Box component='img' src='/deleteIcon.png' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        sx={{ mb: "32px" }}
        rowsPerPageOptions={[7, 14, 21]}
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
