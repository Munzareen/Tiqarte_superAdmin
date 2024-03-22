import React from "react";
import { useState } from "react";
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
  Button,
  Typography,
  TablePagination,
} from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const OrdersTable = ({ customersOrders, isLoading }) => {
  // console.log("customersData", customersData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  // console.log(isLoading)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const itemsPerPage = 5;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = customersOrders?.slice(startIndex, endIndex);

  // const handleDelete = (id) => {
  //   allArticles
  //     ?.slice()
  //     .reverse()
  //     .filter((row) => row.id !== id)
  // }
  const stripStyles = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent;
  };

  return (
    <>
      {/* <Button
        variant="contained"
        onClick={() => {
          print("BANg");
          navigate("/customers/create-customer");
        }}
        sx={{
          color: "white",
          borderColor: "#FCA311",
          width: "216px",
          height: "55px",
          fontSize: "18px",
          fontWeight: 600,
          bgcolor: "#2460B8",
          textTransform: "capitalize",
          borderRadius: "16px",
          // apply padding top
          padding: "32px",
          border: "1px soliid #FCA311",
          "&.MuiButton-root:hover": {
            //   boxShadow: "none",
            //   borderColor: "#FCA311",
            bgcolor: "#2460B8",
          },
        }}
        startIcon={
          <Box
            component="img"
            src={"/addWhiteIcon.png"}
            sx={{ width: "14px", height: "14 px", color: "white" }}
          />
        }
      >
        Create orders
      </Button>
 */}
      <TableContainer component={Paper} sx={{ my: "32px" }}>
        {isLoading ? (
          <Typography sx={{ textAlign: "center", fontSize: "2rem" }}>
            Loading
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="center">Events</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Date</TableCell>
                {/* <TableCell align='center'>Action</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData
                ?.slice()
                .reverse()
                .map((row) => {
                  return (
                    <TableRow key={row.Id}>
                      <TableCell component="th" scope="row">
                        #{row.OrderNo}
                      </TableCell>
                      <TableCell align="center">{row.EventName}</TableCell>
                      <TableCell align="center">€{row.TotalAmount}</TableCell>
                      <TableCell align="center">€{row.Status}</TableCell>
                      <TableCell align="center">
                        {dayjs(row.PurchaseDate).format("DD MMM YYYY")}
                      </TableCell>

                      {/* <TableCell align='center'>
                        <IconButton
                          // onClick={() => {
                          //   dispatch(setEditData(row))
                          //   navigate("/venues/create-venue")
                          // }}
                          aria-label='edit'
                        >
                          <Box
                            component='img'
                            src='/editIcon.png'
                            sx={{ mr: "0.5rem" }}
                          />
                        </IconButton>
                        <IconButton
                          //   onClick={() => handleDelete(row.UserId)}
                          aria-label='delete'
                        >
                          <Box
                            component='img'
                            src='/deleteIcon.png'
                            sx={{ ml: "0.5rem" }}
                          />
                        </IconButton>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={customersOrders?.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={itemsPerPage}
        rowsPerPageOptions={[]}
      />
    </>
  );
};
