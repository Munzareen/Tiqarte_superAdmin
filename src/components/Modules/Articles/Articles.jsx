import { Box, Button, Container } from "@mui/material"
import React, { useState } from "react"
import SearchInput from "../../Common/SearchInput"
import { useNavigate } from "react-router-dom"
import { ArticleTable } from "./ArticleTable/ArticleTable"
import {
  useDeleteArticleMutation,
  useGetAllArticleQuery,
} from "../../../store/services/Articles/article.services"
import { useAuthRedirect } from "../../Common/authRedirect"
import { useDispatch } from "react-redux"
import { clearEditData } from "../../../store/slices/editDataSlice"

export const Articles = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: allArticles, error, isLoading } = useGetAllArticleQuery()
  const [deleteArticle, { isError, isSuccess, status, data }] =
    useDeleteArticleMutation()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = allArticles?.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleDelete = async (id) => {
    await deleteArticle(id)
  }
  useAuthRedirect(error)
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Box sx={{ mt: "25px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SearchInput
            sx={{ width: "48%", bgcolor: "white" }}
            placeHoder={"search"}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant='contained'
            onClick={() => {
              dispatch(clearEditData())
              navigate("/articles/create-article")
            }}
            sx={{
              color: "white",
              width: { lg: "216px" },
              height: "55px",
              fontSize: { xs: "11px", md: "14px", lg: "18px" },
              fontWeight: 600,
              bgcolor: "#2460B8",
              textTransform: "capitalize",
              borderRadius: "16px",
              "&.MuiButton-root:hover": {
                // boxShadow: "none",
                bgcolor: "#2460B8",
              },
            }}
            startIcon={
              <Box
                component='img'
                src={"/addWhiteIcon.png"}
                sx={{ width: "14px", height: "14px", color: "white" }}
              />
            }
          >
            Create article
          </Button>
        </Box>
        <ArticleTable
          allArticles={filteredData}
          isLoading={isLoading}
          handleDelete={handleDelete}
        />
      </Box>
    </Container>
  )
}
