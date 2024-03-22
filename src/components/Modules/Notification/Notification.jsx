import { Box, Button, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import { UserGroupTable } from "./UserGroupTable/UserGroupTable"
import {
  useDeleteUserGroupMutation,
  useGetAllNotificationQuery,
  useGetAllUserGroupsQuery,
} from "../../../store/services/Notification/Notification.services"
import { useAuthRedirect } from "../../Common/authRedirect"

export const Notification = () => {
  const navigate = useNavigate()
  const { data: userGroupList, isLoading, error } = useGetAllUserGroupsQuery()
  const { data: userNotification, isLoading: isNotificationLoading } =
    useGetAllNotificationQuery()
  console.log(userNotification)
  const [deleteUserGroup, {}] = useDeleteUserGroupMutation()
  const handleDelete = async (id) => {
    await deleteUserGroup(id)
  }
  useAuthRedirect(error)
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", py: "2rem" }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: 500, color: "#202020" }}
        >
          Recent notifications
        </Typography>

        <Button
          variant='contained'
          onClick={() => navigate("/notification/create-notification")}
          sx={{
            color: "white",
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",

            "&.MuiButton-root:hover": {
              //   boxShadow: "none",

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
          Create notification
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          dropShadow: "(0px 1px 0px #CFCFCF) drop-shadow(0px -1px 0px #CFCFCF)",
          bgcolor: "#ffff",
          p: "16px",
          borderRadius: "16px",
          border: "1px solid #F0F0F0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              bgcolor: "#F0F4FA",
              p: "0.5rem",
              borderRadius: "4rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Box component='img' src='/check-mark-circle.png' />
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#202020",
              ml: "12px",
            }}
          >
            Your check-in has been successfully completed. Please proceed to the
            venue and enjoy the event.
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "12px", fontWeight: 600, color: "#202020" }}
        >
          time
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "3.25rem" }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: 500, color: "#202020" }}
        >
          User group list
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate("/notification/create-user-group")}
          sx={{
            color: "white",

            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",

            "&.MuiButton-root:hover": {
              bgcolor: "#2460B8",
            },
          }}
          startIcon={
            <Box
              component='img'
              src={"/addWhiteIcon.png"}
              sx={{ width: "14px", height: "14 px", color: "white" }}
            />
          }
        >
          Create user group
        </Button>
      </Box>
      <UserGroupTable
        userGroupList={userGroupList}
        isLoading={isLoading}
        handleDelete={handleDelete}
      />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: "3.25rem" }}
      >
        <Typography
          sx={{ fontSize: "22px", fontWeight: 500, color: "#202020" }}
        >
          Notifications templates list
        </Typography>
        <Button
          variant='contained'
          onClick={() => navigate("/notification/create-new-template")}
          sx={{
            color: "white",
            height: "55px",
            fontSize: "18px",
            fontWeight: 600,
            bgcolor: "#2460B8",
            textTransform: "capitalize",
            borderRadius: "16px",
            "&.MuiButton-root:hover": {
              bgcolor: "#2460B8",
            },
          }}
          startIcon={
            <Box
              component='img'
              src={"/addWhiteIcon.png"}
              sx={{ width: "14px", height: "14 px", color: "white" }}
            />
          }
        >
          Create new template
        </Button>
      </Box>
      <Box sx={{ mt: "2rem" }}>
        <NotificationTemplate />
      </Box>
    </>
  )
}

const NotificationTemplate = () => {
  return (
    <Box
      sx={{
        border: "1px solid #CFCFCF",
        width: "332px",
        p: "2rem",
        bgcolor: "white",
        borderRadius: "0.6rem",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{ color: "#202020", fontWeight: 500, fontSize: "16px" }}
        >
          Template 1
        </Typography>
        <Box component='img' src='/editIcon.png' sx={{ mr: "0.5rem" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "#F0F0F0",
          mt: "1rem",
          px: "24px",
          py: "16px",
          borderRadius: "0.6rem",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#606060", fontWeight: 500, fontSize: "12px" }}
          >
            UserGround
          </Typography>
          <Typography
            sx={{ color: "#202020", fontWeight: 400, fontSize: "16px" }}
          >
            public
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ color: "#606060", fontWeight: 500, fontSize: "12px" }}
          >
            UserGround
          </Typography>
          <Typography
            sx={{ color: "#202020", fontWeight: 400, fontSize: "16px" }}
          >
            public
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#F0F0F0",
          mt: "1rem",
          px: "24px",
          py: "16px",
          borderRadius: "0.6rem",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#606060", fontWeight: 500, fontSize: "12px" }}
          >
            Trigger
          </Typography>
          <Typography
            sx={{ color: "#202020", fontWeight: 400, fontSize: "16px" }}
          >
            purchased ticket
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#F0F0F0",
          mt: "1rem",
          px: "24px",
          py: "16px",
          borderRadius: "0.6rem",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#606060", fontWeight: 500, fontSize: "12px" }}
          >
            Notes
          </Typography>
          <Typography
            sx={{ color: "#202020", fontWeight: 400, fontSize: "16px" }}
          >
            Lorum ipsum for will let atten dees know that their check-in was
            successful and they can now enter the event....
          </Typography>
          <Button sx={{ p: 0, textTransform: "capitalize" }}>Read more</Button>
        </Box>
      </Box>
    </Box>
  )
}
