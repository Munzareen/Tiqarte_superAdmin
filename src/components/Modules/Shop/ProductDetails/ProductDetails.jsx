import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { InputField } from "../../../Common/InputField"
import ReactQuill from "react-quill"
import { DragandDropLable } from "../../Events/DragandDropLable"
import { DragDropFile } from "../../Events/DragAndDropField"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"
import { useEditProductMutation } from "../../../../store/services/Shop/shop.services"

export const ProductDetails = ({ handleNext, setProductDetail }) => {
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    price: "",
    deliveryDetail: "",
    thumbnail: null,
    titleImage: null,
  })
  const [editorHtml, setEditorHtml] = useState("")
  const [productFor, setProductFor] = useState("men")
  const [colorVariations, setColorVariations] = useState([])
  const [sizeVariations, setSizeVariations] = useState([])
  const [editProduct, { isSuccess }] = useEditProductMutation()
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

  // const handleCheck = (e) => {
  //   setTrackQuantity(e.target.checked)
  // }
  const handleChange = (html) => {
    setEditorHtml(html)
  }

  const handleImageChange = (imageName, imageUrl) => {
    if (imageName === "thumbnail") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        thumbnail: imageUrl,
      }))
    } else if (imageName === "titleImage") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        titleImage: imageUrl,
      }))
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleProductForChange = (e) => {
    setProductFor(e.target.value)
  }
  const handleSubmit = () => {
    const productDetail = {
      title: formData.title,
      sku: formData.sku,
      price: formData.price,
      deliveryDetail: formData.deliveryDetail,
      colorVariations: colorVariations,
      sizeVariations: sizeVariations,
      thumbnail: formData.thumbnail,
      titleImage: formData.titleImage,
      productDescription: editorHtml,
      productFor: productFor,
    }

    setProductDetail(productDetail)
  }

  const handleVariationChange = (index, value, type) => {
    if (type === "color") {
      setColorVariations((prevVariations) => {
        const newVariations = [...prevVariations]
        newVariations[index].VariationName = value
        return newVariations
      })
    } else if (type === "size") {
      setSizeVariations((prevVariations) => {
        const newVariations = [...prevVariations]
        newVariations[index].VariationName = value
        return newVariations
      })
    }
  }

  const handleDescriptionChange = (index, value, type) => {
    if (type === "color") {
      setColorVariations((prevVariations) => {
        const newVariations = [...prevVariations]
        newVariations[index].VariationDescription = value
        return newVariations
      })
    } else if (type === "size") {
      setSizeVariations((prevVariations) => {
        const newVariations = [...prevVariations]
        newVariations[index].VariationDescription = value
        return newVariations
      })
    }
  }

  const addVariation = (type) => {
    if (type === "color") {
      setColorVariations((prevVariations) => [
        ...prevVariations,
        { VariationName: "", VariationDescription: "" },
      ])
    } else if (type === "size") {
      setSizeVariations((prevVariations) => [
        ...prevVariations,
        { VariationName: "", VariationDescription: "" },
      ])
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <InputField
          label={"Tile"}
          sx={{ width: "332px" }}
          name='title'
          value={formData.title}
          type={"text"}
          onChange={handleInputChange}
        />
        <InputField
          label={"SKU"}
          sx={{ width: "332px", ml: "33px" }}
          name='sku'
          value={formData.sku}
          type={"text"}
          onChange={handleInputChange}
        />
        <InputField
          label={"Price"}
          sx={{ width: "332px", ml: "33px" }}
          name='price'
          value={formData.price}
          type={"text"}
          onChange={handleInputChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "32px",
        }}
      >
        <InputField
          label={"Delivery detail"}
          sx={{ width: "515px" }}
          name='deliveryDetail'
          value={formData.deliveryDetail}
          type={"text"}
          onChange={handleInputChange}
        />

        {/* <Box sx={{ width: "515px" }}>
          <FormControlLabel
            sx={{
              // mr: "114px",
              mt: "2rem",
              // height:"100%",
              color: "#758895",
              "& .MuiTypography-root": {
                fontSize: "14px",
              },
            }}
            control={
              <Checkbox
                name='trackQuantity'
                defaultChecked={trackQuantity}
                onChange={handleCheck}
              />
            }
            label='Track quantity'
          />
        </Box> */}
      </Box>

      <Box sx={{ mt: "32px" }}>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "14px",
            fontWeight: 400,
            pb: "8px",
          }}
        >
          Product description
        </Typography>
        <ReactQuill
          theme='snow'
          modules={modules}
          formats={formats}
          value={editorHtml}
          onChange={handleChange}
          styles={{ height: "170px", background: "white" }}
        />
      </Box>
      <Box sx={{ display: "flex", mt: "32px" }}>
        <CustomSelectWithoutLabel
          fieldName={"Product for"}
          sx={{ width: "515px" }}
          value={productFor}
          handleChange={handleProductForChange}
        >
          <MenuItem value='men'>
            <em>men</em>
          </MenuItem>
          <MenuItem value={"women"}>women</MenuItem>
          <MenuItem value={"unisex"}>Unisex</MenuItem>
        </CustomSelectWithoutLabel>
        <InputField label={"Category"} sx={{ width: "515px", ml: "33px" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "32px",
        }}
      >
        <Box>
          <DragandDropLable lable={"Upload thumbnail"} />
          <DragDropFile
            style={{ width: "515px" }}
            onImageChange={handleImageChange}
            imageName='thumbnail'
          />
        </Box>
        <Box>
          <DragandDropLable lable={"Upload title image"} />
          <DragDropFile
            style={{ width: "515px" }}
            onImageChange={handleImageChange}
            imageName='titleImage'
          />
        </Box>
      </Box>
      <FormControl fullWidth sx={{ mt: "1rem" }}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Color Variations
        </Typography>
        {colorVariations.map((colorVariation, index) => (
          <div key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "1rem",
              }}
            >
              <InputField
                sx={{ width: "515px" }}
                label={`Color Variation ${index + 1}`}
                value={colorVariation.VariationName || ""}
                onChange={(event) =>
                  handleVariationChange(index, event.target.value, "color")
                }
              />
              <InputField
                sx={{ width: "515px" }}
                label={`Description ${index + 1}`}
                value={colorVariation.VariationDescription || ""}
                onChange={(event) =>
                  handleDescriptionChange(index, event.target.value, "color")
                }
              />
            </Box>
          </div>
        ))}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => addVariation("color")}>
            Add Color Variation
          </Button>
        </Box>
      </FormControl>

      {/* Size Variations */}
      <FormControl fullWidth sx={{ mt: "1rem" }}>
        <Typography variant='h6' sx={{ fontWeight: 600 }}>
          Size Variations
        </Typography>
        {sizeVariations.map((sizeVariation, index) => (
          <div key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "1rem",
              }}
            >
              <InputField
                sx={{ width: "515px" }}
                label={`Size Variation ${index + 1}`}
                value={sizeVariation.VariationName || ""}
                onChange={(event) =>
                  handleVariationChange(index, event.target.value, "size")
                }
              />
              <InputField
                sx={{ width: "515px" }}
                label={`Description ${index + 1}`}
                value={sizeVariation.VariationDescription || ""}
                onChange={(event) =>
                  handleDescriptionChange(index, event.target.value, "size")
                }
              />
            </Box>
          </div>
        ))}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => addVariation("size")}>
            Add Size Variation
          </Button>
        </Box>
      </FormControl>
      <Button
        variant='contained'
        onClick={handleSubmit}
        sx={{
          color: "white",
          borderColor: "#FCA311",
          width: "332px",
          height: "55px",
          fontSize: "18px",
          fontWeight: 600,
          lineHeight: "19px",
          bgcolor: "#2460B8",
          textTransform: "capitalize",
          borderRadius: "16px",
          my: "48px",
          border: "1px soliid #FCA311",
          "&.MuiButton-root:hover": {
            //   boxShadow: "none",
            //   borderColor: "#FCA311",
            bgcolor: "#2460B8",
          },
        }}
      >
        Continue
      </Button>
    </>
  )
}
