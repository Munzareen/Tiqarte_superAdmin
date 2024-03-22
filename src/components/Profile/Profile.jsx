import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    FormHelperText,
    Grid,
    MenuItem,
    Typography,
  } from "@mui/material"

  import { useNavigate } from "react-router-dom"

  import { useFormik } from "formik"
  import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { useGetAllEventQuery } from '../../store/services/Events/event.services'
import { useAddEventUsersMutation,  } from '../../store/services/Pages/Pages.services'
import { InputField } from '../Common/InputField'
import { useEditEventUserMutation } from '../../store/services/Users/Users.services'
import { CustomSelectWithoutLabel } from '../Common/CustomSelectWithoutLabel'
  const userRole = [
    {
      id: 1,
      role: "Admin",
    },
    {
      id: 2,
      role: "Moderator",
    },
    {
      id: 3,
      role: "Scanner",
    },
    {
      id: 4,
      role: "Ticket booth",
    },
  ]
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    role: yup.number().required("Role is required"),
    events: yup.number().required("Event is required"),
  })

const Profile = () => {
    const navigate = useNavigate()
  const editData = useSelector((state) => state.editData)
  const dispatch = useDispatch()
  const {
    data: allEvents,
    error,
    isLoading: isEventLoading,
  } = useGetAllEventQuery()

  const [addEventVenue, { isLoading, isSuccess, status, data }] =
    useAddEventUsersMutation()
  const [
    editEventUser,
    { isLoading: editLoading, isSuccess: editSuccess, error: editError },
  ] = useEditEventUserMutation()
  const isEditing = !!editData

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone:"",
      isPointOfSaleUser: true,
      canReportOrders: true,
      role: "",
      events: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (isEditing) {
        const editedData = {
          Id: editData.Id,
          Name: values.name,
          Email: values.email,
          Phone: values.phone,
          Password: values.password,
          RoleId: values.role,
          EventId: values.events,
          isPOSUser: values.isPointOfSaleUser,
          isReportOrders: values.canReportOrders,
        }
        await editEventUser(editedData)
        dispatch(clearEditData())
      } else {
        const newUserData = {
          Name: values.name,
          Email: values.email,
          Phone: values.phone,
          Password: values.password,
          RoleId: values.role,
          EventId: values.events,
          isPOSUser: values.isPointOfSaleUser,
          isReportOrders: values.canReportOrders,
        }
        await addEventVenue(newUserData)
      }
    },
  })

  useEffect(() => {
    if (isSuccess || editSuccess) {
      navigate("/users")
    }
  }, [isSuccess, navigate, editSuccess])
  useEffect(() => {
    if (editData) {
      formik.setValues({
        name: editData.Name,
        email: editData.Email,
        password: editData.Password,
        Phone: editData.phone,
        isPointOfSaleUser: editData.isPOSUser || false,
        canReportOrders: editData.isReportOrders || false,
        role: editData.RoleId || "",
        events: editData.EventId || (allEvents && allEvents[0]?.Id) || "",
      })
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
          <Box component='form' onSubmit={formik.handleSubmit}>
            <Grid container columnSpacing={4}>
              <Grid item xs={12}>
                <Typography
                  sx={{
                    color: "#202020",
                    fontWeight: 500,
                    fontSize: "22px",
                    mt: "30px",
                  }}
                >
                  My Profile
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
                <InputField
                  label={"Name"}
                  field={formik.getFieldProps("name")}
                  form={formik}
                />
                <FormHelperText>
                  {formik.touched.name && formik.errors.name}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
                <InputField
                  label={"Email"}
                  field={formik.getFieldProps("email")}
                  form={formik}
                />
                <FormHelperText>
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
                <CustomSelectWithoutLabel
                  label={"Role"}
                  field={formik.getFieldProps("role")}
                  form={formik}
                >
                  {userRole.map((role) => {
                    return (
                      <MenuItem value={role.id} key={role.id}>
                        {role.role}
                      </MenuItem>
                    )
                  })}
                </CustomSelectWithoutLabel>
                <FormHelperText>
                  {formik.touched.role && formik.errors.role}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mt: "32px" }}>
                <InputField
                  label={"Password"}
                  field={formik.getFieldProps("password")}
                  form={formik}
                />
                <FormHelperText>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </Grid>
              {/* change to dynamic width */}
              <Grid item xs={12} sx={{ mt: "32px" }}>
              <InputField
                  label={"Phone No."}
                  field={formik.getFieldProps("phone")}
                  form={formik}
                />
                <CustomSelectWithoutLabel
                  label={"Choose Event"}
                  field={formik.getFieldProps("events")}
                  form={formik}
                >
                  {isEventLoading && (
                    <Typography sx={{ textAlign: "center" }}>
                      Fetching events...
                    </Typography>
                  )}
                  {allEvents?.map((event) => {
                    return (
                      <MenuItem value={event.EventId} key={event.EventId}>
                        {event.data.Title}
                      </MenuItem>
                    )
                  })}
                </CustomSelectWithoutLabel>
                <FormHelperText>
                  {formik.touched.events && formik.errors.events}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ mt: "2rem" }}>
                <FormControlLabel
                  sx={{
                    color: "#758895",
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      name='isPointOfSaleUser'
                      {...formik.getFieldProps("isPointOfSaleUser")}
                    />
                  }
                  label='Is it point of sale user?'
                />
              </Grid>
              <Grid item xs={12} sm={3} sx={{ mt: "2rem" }}>
                <FormControlLabel
                  sx={{
                    color: "#758895",
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      name='canReportOrders'
                      {...formik.getFieldProps("canReportOrders")}
                    />
                  }
                  label='Can this user report orders??'
                />
              </Grid>
              <Grid item xs={12} sx={{ my: "48px" }}>
                <Button
                  disabled={isLoading}
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
                      //   boxShadow: "none",
                      //   borderColor: "#FCA311",
                      bgcolor: "#2460B8",
                    },
                  }}
                >
                  {isEditing ? "Edit User" : "Done"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )
}

export default Profile