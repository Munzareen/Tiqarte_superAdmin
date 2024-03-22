import React, { useState } from "react"
import { useUploadImageMutation } from "../../../../store/services/UploadImage/UploadImage.services"

export function DragDropFile({ style, onImageChange, imageName }) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const inputRef = React.useRef(null)
  const [
    uploadImage,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useUploadImageMutation() // Initialize your upload mutation
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        onImageChange(imageName, reader.result)
      }
    }
  }

  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file) {
        const formDataImg = new FormData()
        formDataImg.append("ImageFile", file)

        uploadImage(formDataImg)
          .then((response) => {
            if (response.data) {
              const imageURL = response.data
              onImageChange(imageName, imageURL)
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
    }
  }

  const onButtonClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  return (
    <div id='form-file-upload' style={{ ...style }} onDragEnter={handleDrag}>
      <input
        ref={inputRef}
        type='file'
        id='input-file-upload'
        name={imageName}
        onChange={handleChange}
      />

      <label
        id='label-file-upload'
        htmlFor='input-file-upload'
        className={dragActive ? "drag-active" : ""}
      >
        <div>
          <img src='/drag-and-drop.png' style={{ marginTop: "20px" }} />
          <div style={{ marginTop: "12px", marginBottom: "12px" }}>
            <button className='upload-button' onClick={onButtonClick}>
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
