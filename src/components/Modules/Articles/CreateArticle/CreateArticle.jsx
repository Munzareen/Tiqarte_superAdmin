import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { InputField } from "../../../Common/InputField"
import ReactQuill from "react-quill"
import { useNavigate } from "react-router-dom"
import InputDateAndTimePicker from "../../../Common/InputDateAndTimePicker"
import { DateField, TimeField } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import {
  useAddArticleMutation,
  useEditArticleMutation,
  useGetAllArticleQuery,
} from "../../../../store/services/Articles/article.services"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"
import { clearEditData } from "../../../../store/slices/editDataSlice"
import { DnDLabel } from "../../../Common/DnDLabel/DnDLabel"
import { DnDFile } from "../../../Common/DnDFile.jsx/DnDFile"

export const CreateArticle = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    snippets: "",

    date: dayjs(),
    time: dayjs().format("HH:mm"),
    image: "",
  })
  const [venueTextEditor, setVenueTextEditor] = useState("")
  const inputRef = React.useRef(null)
  const isEditing = !!editData
  const handleEditorChange = (html) => {
    setVenueTextEditor(html)
  }
  const [addArticle, { isLoading, isError, isSuccess, status, data }] =
    useAddArticleMutation()
  const [
    editArticle,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditArticleMutation()

  const handleInputChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0]

      // Read the file and convert it to base64
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result, // Set the base64 data in the state
        })
      }
      reader.readAsDataURL(file)
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isEditing) {
      const postdata = {
        ArticleId: editData.ArticleId,
        Title: formData.title,
        Snippets: formData.snippets,
        ArticleText: venueTextEditor,
        ImageUrl: formData.image,
        ScheduleDate: dayjs(formData.date, "DD/MM/YYYY").format(
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        ),
        ScheduleTime: dayjs(`2023-09-19T${formData.time}:00`).format(
          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
        ),
      }
      await editArticle(postdata)
      dispatch(clearEditData())
    } else {
      const postdata = {
        IsPublished: true,
        Title: formData.title,
        Snippets: formData.snippets,
        ArticleText: venueTextEditor,
        ImageUrl: formData.image,
        ScheduleDate: formData.date,
        ScheduleTime: formData.time,
      }
      await addArticle(postdata)
    }
  }
  const onButtonClick = () => {
    inputRef.current.click()
  }

  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/articles")
    }
  }, [isSuccess, navigate, editSuccess])
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      [{ font: [] }],
      [{ case: "upper" }, { case: "lower" }],
      ["link", "image"],
    ],
  }

  const formats = ["header", "bold", "italic", "underline", "link", "image"]
  useEffect(() => {
    if (editData) {
      const dateTimeString = editData.Scheduled
      const [date, time] = dateTimeString.split(" ")
      console.log("date", date, time)
      setFormData({
        title: editData.Title,
        snippets: editData.Snippets,
        image: editData.ImageUrl,
        date: date,
        time: time,
      })
      setVenueTextEditor(editData.ArticleText)
    }
  }, [editData])
  // title: "",
  // snippets: "",
  // articleText: "",
  // date: dayjs(), // set default date to current date
  // time: dayjs().format("HH:mm"), // set default time to current time
  // articleText: "",
  const updateImgState = (label, newImgValue) => {
    setFormData({
      ...formData,
      [label]: newImgValue,
    })
  }
  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Box component='form' onSubmit={handleSubmit}>
        <Typography
          sx={{
            color: "#202020",
            fontWeight: 500,
            fontSize: "22px",
            mt: "50px",
          }}
        >
          Enter the details below
        </Typography>
        <Grid container columnSpacing={4}>
          <Grid item xs={12} sm={6}>
            <InputField
              label={"Title"}
              sx={{ width: "100%" }}
              name='title'
              value={formData.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputField
              label={"Snippets"}
              sx={{ width: "100%" }}
              name='snippets'
              value={formData.snippets}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: "32px", width: "100%" }}>
            <DnDLabel lable={"Upload image"} />
            <DnDFile label='image' updateImgState={updateImgState} />
          </Grid>
          {formData.image && (
            <Box sx={{ mt: "2rem" }}>
              <img src={formData.image} width={100} height={100} />
            </Box>
          )}
          <Grid item xs={12} sx={{ mt: "2.3125rem" }}>
            <Box>
              <Typography
                sx={{
                  color: "#707070",
                  fontSize: "14px",
                  fontWeight: 400,
                  pb: "8px",
                }}
              >
                Copy
              </Typography>
              <ReactQuill
                theme='snow'
                modules={modules}
                formats={formats}
                value={venueTextEditor}
                onChange={handleEditorChange}
                styles={{ height: "170px", background: "white" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ mt: "32px" }}>
            <FormControlLabel
              sx={{
                color: "#758895",
                "& .MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
              control={<Checkbox defaultChecked />}
              label='Schedule'
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: "32px",
              "& .MuiStack-root": {
                width: "100%",
              },
            }}
          >
            <InputDateAndTimePicker
              field='DateField'
              React
              fieldType={
                <DateField
                format="DD/MM/YYYY"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "48px",
                      borderRadius: "16px",
                      bgcolor: "white",
                      overflow: "hidden",
                      color: "#707070",

                      "& .MuiTypography-root": {
                        color: "red",
                        fontSize: "14px",
                      },
                    },
                  }}
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      date: dayjs(date).format("DD MMM YYYY"),
                    })
                  }
                />
              }
              label={"Date"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              mt: "32px",
              "& .MuiStack-root": {
                width: "100%",
              },
            }}
          >
            <InputDateAndTimePicker
              field='TimeField'
              // sx={{
              // "& .MuiStack-root": {
              //   width: "100%",
              // },
              // }}
              fieldType={
                <TimeField
                ampm={false}
                  sx={{
                    "& .MuiInputBase-root": {
                      height: "48px",
                      borderRadius: "16px",
                      bgcolor: "white",
                      overflow: "hidden",
                      color: "#707070",

                      "& .MuiTypography-root": {
                        color: "red",
                        fontSize: "14px",
                      },
                    },
                  }}
                  onChange={(time) =>
                    setFormData({
                      ...formData,
                      time: dayjs(time).format("HH:mm"),
                    })
                  }
                />
              }
              label={"Time"}
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ my: "48px" }}>
            <Button
              type='submit'
              variant='contained'
              sx={{
                color: "white",
                borderColor: "#FCA311",
                width: { xs: "100%", sm: "332px" },
                height: "55px",
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "19px",
                bgcolor: "#2460B8",
                textTransform: "capitalize",
                borderRadius: "16px",
                border: "1px soliid #FCA311",
                "&.MuiButton-root:hover": {
                  bgcolor: "#2460B8",
                },
              }}
            >
              {isEditing ? "Edit article" : "Done"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export const DragandDropLable = ({ lable }) => {
  return (
    <Typography
      sx={{
        mb: "8px",
        color: "#707070",
        fontWeight: 400,
        fontSize: "14px",
      }}
    >
      {lable}
    </Typography>
  )
}

export function DragDropFile({
  style,
  dragActive,
  handleDrag,
  handleDrop,
  handleInputChange,
  onButtonClick,
  inputRef,
}) {
  const handleClick = (e) => {
    e.preventDefault()
    onButtonClick()
  }
  return (
    <div
      id='form-file-upload'
      style={{ ...style }}
      onDragEnter={handleDrag}
      // onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        id='input-file-upload'
        name='file' // Set the name to "file" to match the property in formData
        onChange={handleInputChange}
      />

      <label
        id='label-file-upload'
        htmlFor='input-file-upload'
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <img src='/drag-and-drop.png' style={{ marginTop: "20px" }} />
          <div style={{ marginTop: "12px", marginBottom: "12px" }}>
            <button className='upload-button' onClick={handleClick}>
              <span style={{ color: "#707070" }}>Drag and drop</span> Upload a
              file
            </button>
          </div>
        </div>
      </label>
      {dragActive && (
        <div
          id='drag-file-element'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  )
}
