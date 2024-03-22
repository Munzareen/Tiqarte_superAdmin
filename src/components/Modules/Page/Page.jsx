import { Box, Container, Grid, IconButton, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import {
  useGetAllPagesQuery,
  useGetPageHeaderQuery,
} from "../../../store/services/Pages/Pages.services"
import { useDispatch } from "react-redux"
import { setEditData } from "../../../store/slices/editDataSlice"
import { Loader } from "../../Common/Loader/Loader"

export const Page = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading } = useGetAllPagesQuery()
  const { data: headerData } = useGetPageHeaderQuery()
  // console.log(headerData[0])
  const allowedPageNames = ["Home", "News", "Booking", "Shop", "FAQs", "Privacy policy", "Refund and cancellation", "Terms and conditions", "Delivery policy"];

const pageCards = data?.filter(page => page?.PageName && allowedPageNames.includes(page.PageName))
  .map((page, index) => (
    <Grid item xs={12} sm={6} lg={4} key={index}>
      <PageCard
        name={page.Title}
        img={page.ImageURL}
        onClick={() => handleCardClick(page)}
      />
    </Grid>
  ));

  const handleCardClick = (page) => {
    
      if (page.PageName === "Home") {
        dispatch(setEditData(headerData[0]))
        navigate(`/pages/Edit${page.PageName.replace(/\s+/g, "")}Page`)
      } else {
        dispatch(setEditData(page))
        navigate(`/pages/Edit${page.PageName.replace(/\s+/g, "")}Page`)
      }
  }

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Loader />
    </Box>
  ) : (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Grid container columnSpacing={6}>
        {pageCards}
      </Grid>
    </Container>
  )
}

const PageCard = ({ name, onClick, img }) => {
  // const handleEditClick = () => {
  //   dispatch(setEditData(editData))
  //   navigate(`/pages/Edit${page.PageName}Page`)
  // }

  return (
    <Box
      onClick={onClick}
      sx={{
        border: "1px solid #CFCFCF",
        width: "100%",
        height: "337px",
        px: "24px",
        pt: "16px",
        pb: "16px",
        borderRadius: "16px",
        mt: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ color: "#202020", fontWeight: 500 }}>
          {name}
        </Typography>
        <IconButton onClick={onClick} aria-label='edit' sx={{ p: 0, m: 0 }}>
          <Box component='img' src='/editIcon.png' sx={{ mr: "0.5rem" }} />
        </IconButton>
      </Box>
      <Box
        component='img'
        src={img}
        sx={{
          mt: "16px",
          width: "100%",
          height: "258px",
          objectFit: "contain",
        }}
      />
    </Box>
  )
}
