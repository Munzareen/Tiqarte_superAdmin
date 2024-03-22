import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material"
import React, { useState } from "react"

export const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  
  const renderMenu = (
    <>
      <Box>
        <Menu
          keepMounted
          id='menu-appbar'
          sx={{ mt: "45px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(null)}
        >
          <MenuItem
            sx={{ display: "flex" }}
            onClick={() =>
              history.push(`/profile/${localStorage.getItem("user_id")}`)
            }
          >
            <Typography textAlign='center' sx={{ fontFamily: "futuraBook" }}>
              {t("yourProfile")}
            </Typography>
          </MenuItem>

          <MenuItem
            sx={{ display: "flex" }}
            // onClick={async () => await AuthService.logout(history)}
          >
            <Typography textAlign='center' sx={{ fontFamily: "futuraBook" }}>
              {t("logout")}
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
  return (
    <>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "116px",
          bgcolor: "white",
          boxShadow: "none",
          // minHeight:"0px"
        }}
      >
        <Toolbar
          // disablePadding
          sx={{
            "&.MuiToolbar-root": {
              minHeight: "0px",
              my: "40px",
              pl: "32px",
              pr: "40px",
            },
            justifyContent: "space-between",
          }}
        >
          <IconButton
            // color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ color: "#404040", fontSize: "24px", fontWeight: 600 }}
          >
            Events
          </Typography>
          <SearchInput sx={{ width: 414, bgcolor: "#FBFBFB" }} />
          <Box>
            <Badge
              // color='secondary'
              badgeContent=' '
              variant='dot'
              sx={{
                "& .MuiBadge-badge": {
                  bgcolor: "#2460B8",
                  top: "4px",
                  right: "4px",
                  height: "16px",
                  width: "16px",
                  borderRadius: "2rem",
                },
                mr: "30px",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "#F0F4FA",
                  borderRadius: "16px",
                }}
              >
                <Box
                  component='img'
                  src='/notification.png'
                  sx={{ width: "22px", m: "1rem" }}
                />
              </Box>
            </Badge>
            <IconButton
              onClick={(e) => {
                console.log("clicked")
                setAnchorElUser(e.currentTarget)
              }}
            >
              <Box
                component='img'
                src='/profile.png'
                sx={{ width: "52px", height: "52px", mr: "30px" }}
              />
            </IconButton>
            <MySelect />
          </Box>
        </Toolbar>
        {renderMenu}
      </AppBar>
    </>
  )
}
