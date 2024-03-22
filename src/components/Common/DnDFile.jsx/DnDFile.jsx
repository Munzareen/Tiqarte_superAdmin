import React, { useRef, useState } from "react"
import { useUploadImageMutation } from "../../../store/services/UploadImage/UploadImage.services"

export function DnDFile({
  formData,
  setFormData,
  eventImageType,
  imageTypeName,
  label,
  updateImgState,
}) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)
  const [
    uploadImage,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useUploadImageMutation() // Initialize your upload mutation
  // console.log(label)
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.target.name === "file") {
      const file = e.target.files[0]
      if (file) {
        const formDataImg = new FormData()
        formDataImg.append("ImageFile", file)

        // Call the uploadImage function with the FormData object
        uploadImage(formDataImg)
          .then((response) => {
            // Check if the response has a 'data' property
            if (response.data) {
              // Get the uploaded image URL from the 'data' property
              const imageURL = response.data

              // Update the eventImages array in formData based on eventImageType
              if (imageTypeName === "eventsImage") {
                console.log("other images work if first")
                const updatedEventImages = formData.eventImages.map(
                  (eventImage) =>
                    eventImage.EventImagesType === eventImageType
                      ? {
                          ...eventImage,
                          ImageURL: [imageURL], // Store the URL in an array
                          EventImagesType: eventImageType,
                        }
                      : eventImage
                )
                setFormData({
                  ...formData,
                  eventImages: updatedEventImages,
                })
              } else {
                console.log("other images work if")
                updateImgState(label, imageURL)
              }
            } else {
              console.error(
                "Response does not contain 'data' property:",
                response
              )
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error)
          })
      }
      // Upload the file using useUploadImageMutation
    }
  }

  const handleInputChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0]
      if (file) {
        const formDataImg = new FormData()
        formDataImg.append("ImageFile", file)

        // Call the uploadImage function with the FormData object
        uploadImage(formDataImg)
          .then((response) => {
            // Check if the response has a 'data' property
            if (response.data) {
              // Get the uploaded image URL from the 'data' property
              const imageURL = response.data

              // Update the eventImages array in formData based on eventImageType
              if (imageTypeName === "eventsImage") {
                console.log("other images work if first")
                const updatedEventImages = formData.eventImages.map(
                  (eventImage) =>
                    eventImage.EventImagesType === eventImageType
                      ? {
                          ...eventImage,
                          ImageURL: [imageURL], // Store the URL in an array
                          EventImagesType: eventImageType,
                        }
                      : eventImage
                )
                setFormData({
                  ...formData,
                  eventImages: updatedEventImages,
                })
              } else {
                console.log("other images work if")
                updateImgState(label, imageURL)
              }
            } else {
              console.error(
                "Response does not contain 'data' property:",
                response
              )
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error)
          })
      }
      // Upload the file using useUploadImageMutation
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  return (
    <div
      id='form-file-upload'
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        id='input-file-upload'
        name='file'
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
    </div>
  )
}
