import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { InputField } from "../../../Common/InputField"
import ReactQuill from "react-quill"
import { CustomSelectWithoutLabel } from "../../../Common/CustomSelectWithoutLabel"
import { useAddProductMutation } from "../../../../store/services/Shop/shop.services"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { DnDLabel } from "../../../Common/DnDLabel/DnDLabel"
import { DnDFile } from "../../../Common/DnDFile.jsx/DnDFile"
import { useDispatch, useSelector } from "react-redux"
export const AddProduct = () => {
  const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  console.log(editData)
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    price: "",
    deliveryDetail: "",
    thumbnail: null,
    titleImage: null,
  })
  console.log(formData)
  const [editorHtml, setEditorHtml] = useState("")
  const [productFor, setProductFor] = useState("men")
  const [colorVariations, setColorVariations] = useState([])
  const [sizeVariations, setSizeVariations] = useState([])
  const [addProduct, { isLoading, isError, isSuccess, status, data }] =
    useAddProductMutation()
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
  const handleSubmit = (e) => {
    e.preventDefault()
    const productDetail = {
      ProductName: formData.title,
      Sku: formData.sku,
      Price: formData.price,
      DeliveryDetails: formData.deliveryDetail,
      CatagoryId: 2,
      Attributes: [
        {
          AttributeName: "Color",
          AttributeDescription: "Color Attr",
          Variations: colorVariations,
        },
        {
          AttributeName: "Size",
          AttributeDescription: "Size Attr",
          Variations: sizeVariations,
        },
      ],
      ProductImageURLs: [formData.titleImage, formData.thumbnail],
      Description: editorHtml,
      ProductFor: productFor,
    }

    addProduct(productDetail)
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
  useEffect(() => {
    if (isSuccess) {
      navigate("/shop")
    }
  }, [isSuccess])
  const updateImgState = (label, newImgValue) => {
    setFormData({
      ...formData,
      [label]: newImgValue,
    })
  }

  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.ProductName,
        sku: editData.Sku,
        price: editData.Price,
        deliveryDetail: editData.DeliveryDetails,
        thumbnail: editData.isPOSUser || false,
        titleImage: editData.isReportOrders || false,
      })
      setEditorHtml(editData.Description)
    }
  }, [editData])

  return (
    <Container
      sx={{
        "&.MuiContainer-root ": {
          p: 0,
          maxWidth: "1280px",
        },
      }}
    >
      <Grid container columnSpacing={4}>
        <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
          <InputField
            label={"Tile"}
            sx={{ width: "100%" }}
            name='title'
            value={formData.title}
            type={"text"}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
          <InputField
            label={"SKU"}
            sx={{ width: "100%" }}
            name='sku'
            value={formData.sku}
            type={"text"}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ mt: "32px" }}>
          <InputField
            label={"Price"}
            sx={{ width: "100%" }}
            name='price'
            value={formData.price}
            type={"text"}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: "32px" }}>
          <InputField
            label={"Delivery detail"}
            sx={{ width: "100%" }}
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
        </Grid>
        <Grid item xs={12} sx={{ mt: "32px" }}>
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
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
          <CustomSelectWithoutLabel
            fieldName={"Product for"}
            sx={{ width: "100%" }}
            value={productFor}
            handleChange={handleProductForChange}
          >
            <MenuItem value='men'>
              <em>men</em>
            </MenuItem>
            <MenuItem value={"women"}>women</MenuItem>
            <MenuItem value={"unisex"}>Unisex</MenuItem>
          </CustomSelectWithoutLabel>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
          <InputField label={"Category"} sx={{ width: "100%" }} />
        </Grid>
        {/* <Box
          sx={{
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            mt: "32px",
            gap: "5rem",
          }}
        > */}
        <Grid item xs={12} sm={2} sx={{ mt: "32px" }}>
          <Box width={"100%"}>
            <DnDLabel lable={"Upload thumbnail"} />
            <DnDFile label='thumbnail' updateImgState={updateImgState} />
            {formData.titleImage && (
              <Box
                component='img'
                src={formData.thumbnail}
                sx={{ width: "100px", height: "100px", pt: "0.8rem" }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={2} sx={{ mt: "32px" }}>
          <Box width={"100%"}>
            <DnDLabel lable={"Upload title image"} />
            <DnDFile label='titleImage' updateImgState={updateImgState} />
            {formData.titleImage && (
              <Box
                component='img'
                src={formData.titleImage}
                sx={{ width: "100px", height: "100px", pt: "0.8rem" }}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ mt: "1rem" }}>
          <FormControl fullWidth>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Color Variations
            </Typography>
            {colorVariations.map((colorVariation, index) => (
              <Grid container columnSpacing={4} key={index} sx={{ mt: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <InputField
                    sx={{ width: "100%" }}
                    label={`Color Variation ${index + 1}`}
                    value={colorVariation.VariationName || ""}
                    onChange={(event) =>
                      handleVariationChange(index, event.target.value, "color")
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    sx={{ width: "100%" }}
                    label={`Description ${index + 1}`}
                    value={colorVariation.VariationDescription || ""}
                    onChange={(event) =>
                      handleDescriptionChange(
                        index,
                        event.target.value,
                        "color"
                      )
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}
            >
              <Button onClick={() => addVariation("color")}>
                Add Color Variation
              </Button>
            </Box>
          </FormControl>
        </Grid>
        {/* Size Variations */}
        <Grid item xs={12} sx={{ mt: "1rem" }}>
          <FormControl fullWidth>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Size Variations
            </Typography>

            {sizeVariations.map((sizeVariation, index) => (
              <Grid container columnSpacing={4} key={index} sx={{ mt: "1rem" }}>
                <Grid item xs={12} sm={6}>
                  <InputField
                    sx={{ width: "100%" }}
                    label={`Size Variation ${index + 1}`}
                    value={sizeVariation.VariationName || ""}
                    onChange={(event) =>
                      handleVariationChange(index, event.target.value, "size")
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    sx={{ width: "100%" }}
                    label={`Description ${index + 1}`}
                    value={sizeVariation.VariationDescription || ""}
                    onChange={(event) =>
                      handleDescriptionChange(index, event.target.value, "size")
                    }
                  />
                </Grid>
              </Grid>
            ))}

            <Box
              sx={{ display: "flex", justifyContent: "flex-end", mt: "1rem" }}
            >
              <Button onClick={() => addVariation("size")}>
                Add Size Variation
              </Button>
            </Box>
          </FormControl>
        </Grid>

        <Button
          variant='contained'
          onClick={handleSubmit}
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
      </Grid>
    </Container>
  )
}
