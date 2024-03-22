import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MailIcon from "@mui/icons-material/Mail"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Logo from "../../assets/weblogo.png"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import DirectionsIcon from "@mui/icons-material/Directions"
import { Badge, Menu, MenuItem, Select } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import SearchInput from "../Common/SearchInput"
import Cookies from "js-cookie"
const drawerWidth = 305
const sidebarItem = [
  {
    name: "Dashboard",
    icon: "/dashboard.png",
    path: "/dashboard",
  },
  {
    name: "Events",
    icon: "/event.png",
    path: "/events",
  },
  {
    name: "Articles",
    icon: "/article.png",
    path: "/articles",
  },
  {
    name: "Ticket orders",
    icon: "/ticket.png",
    path: "/order",
  },
  {
    name: "Customers",
    icon: "/customers.png",
    path: "/customers",
  },
  {
    name: "Season tickets",
    icon: "/season.png",
    path: "/seasons",
  },
  {
    name: "Pages",
    icon: "/pages.png",
    path: "/pages",
  },
  {
    name: "Shop",
    icon: "/shop.png",
    path: "/shop",
  },
  {
    name: "Promoters",
    icon: "/promoters.png",
    path: "/promoters",
  },
  {
    name: "Discount codes",
    icon: "/discount.png",
    path: "/discount ",
  },
  {
    name: "Reports",
    icon: "/reports.png",
    path: "/reports",
  },
  {
    name: "Scheduled reports",
    icon: "/sechedule.png",
    path: "/scheduled",
  },
  {
    name: "Users",
    icon: "/users.png",
    path: "/users",
  },
  {
    name: "Venues",
    icon: "/venues.png",
    path: "/venues",
  },
]
const adminItem = [
  {
    name: "My account",
    icon: "/account.png",
    path: "/users",
  },
  {
    name: "Logout",
    icon: "/logout.png",
    path: "/users",
  },
]
export const Layout = (props) => {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)
  // const currentLocation = useLocation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const token = Cookies.get("access_token")
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const initialSelected = localStorage.getItem("selectedMenu") || "Dashboard"
  const [selected, setSelected] = React.useState(initialSelected)
  React.useEffect(() => {
    const matchingMenuItem = sidebarItem.find((item) => item.path === pathname)

    if (matchingMenuItem) {
      setSelected(matchingMenuItem.name)
      localStorage.setItem("selectedMenu", matchingMenuItem.name)
    }
  }, [pathname])
  const handleSelectMenu = (item) => {
    setSelected(item.name)
    navigate(item.path)
    localStorage.setItem("selectedMenu", item.name)
  }
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
            // onClick={() =>
            //   history.push(`/profile/${localStorage.getItem("user_id")}`)
            // }
          >
            <Typography textAlign='center'>Profile</Typography>
          </MenuItem>

          <MenuItem sx={{ display: "flex" }} onClick={() => navigate("/login")}>
            {token && (
              <Typography
                textAlign='center'
                onClick={() => {
                  if (Cookies.get("access_token") !== undefined) {
                    Cookies.remove("access_token")
                    setAnchorElUser(null)
                    navigate("/signin")
                  }
                }}
              >
                Logout
              </Typography>
            )}
          </MenuItem>
        </Menu>
      </Box>
    </>
  )
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Box
        component='img'
        src={Logo}
        sx={{ mt: "43px", ml: "40px", mb: "22px" }}
      />

      <List sx={{ mt: "10px" }}>
        {sidebarItem.map((item, index) => (
          <React.Fragment key={index}>
            {index === 13 && (
              <Typography
                sx={{
                  color: "#404040",
                  fontWeight: 500,
                  ml: "40px",
                  mt: "32px",
                  mb: "12px",
                }}
              >
                Administration
              </Typography>
            )}

            <ListItem
              sx={{
                // borderLeft: selected === item.name ? "10px solid	#2460B8" : "",
                // borderTopRightRadius:"1rem"

                display: "flex",
                justifyContent: "space-between",
                pl: "0rem",
                pb: index === 13 ? "0rem" : "",
                // alignItems: "self-start",
                // height: "100%"
              }}
            >
              <Box
                sx={{
                  border: selected === item.name ? "5px solid	#2460B8" : "",
                  height: "3.2rem",
                  borderTopRightRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              />
              <ListItemButton
                onClick={() => {
                  handleSelectMenu(item)
                }}
                sx={{
                  // bgcolor: selected === item.name ? "	rgba(120, 0, 51 , 0.1)" : "",
                  // width:"3rem",

                  ml: selected === item.name ? "" : "10px",
                  "&.MuiListItemButton-root": {
                    pl: "20px",
                    // width:"90%"
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "0px", mr: "23px" }}>
                  <Box
                    component='img'
                    src={item.icon}
                    sx={{ width: "19px", height: "19px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    color: selected === item.name ? "	#2460B8" : "#969BA0",

                    "& .MuiTypography-root": {
                      fontSize: "18px",
                      fontWeight: selected === item.name ? 600 : 500,
                      lineHeight: "27px",
                    },
                    // color: "#969BA0",
                  }}
                  primary={item.name}
                />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      {/* <Divider /> */}

      <List sx={{ pb: "74px" }}>
        {adminItem.map((item, index) => (
          <ListItem key={item.name} disablePadding sx={{ pb: "8px" }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                "&.MuiListItemButton-root": {
                  pl: "40px",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: "0px", mr: "23px" }}>
                <Box
                  component='img'
                  src={item.icon}
                  sx={{ width: "19px", height: "19px" }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "18px",
                    fontWeight: 500,
                    lineHeight: "27px",
                  },
                  color: "#969BA0",
                }}
                primary={item.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline
        sx={{
          display: pathname === "/login" ? "none" : "block",
        }}
      />
      <AppBar
        position='fixed'
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          height: "116px",
          bgcolor: "#FFF",
          boxShadow: "none",
          // minHeight:"0px"
          display: pathname === "/login" ? "none" : "block",
        }}
      >
        <Toolbar
          // disablePadding
          sx={{
            "&.MuiToolbar-root": {
              minHeight: "0px",
              my: "25px",
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
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ color: "#404040", fontSize: "24px", fontWeight: 600 }}
          >
            {selected}
          </Typography>
          {/* <SearchInput
            sx={{ width: { xs: 300, md: 414 }, bgcolor: "#FBFBFB" }}
          /> */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
              aria-label='profile'
              onClick={(e) => {
                setAnchorElUser(e.currentTarget)
              }}
            >
              <Box
                component='img'
                src='/profile.png'
                sx={{
                  width: { md: "52px" },
                  height: { md: "52px" },
                  mr: { md: "30px" },
                }}
              />
            </IconButton>
            {/* <MySelect /> */}
            {renderMenu}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: { md: drawerWidth },
          flexShrink: { sm: 0 },
          display: pathname === "/login" ? "none" : "block",
        }}
        aria-label='sidebar items'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* <Typography</TyTypography> */}

        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          px: pathname === "/login" ? "0px" : { xs: "20px", md: "32px" },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          // height:"100%"
          // width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: pathname === "/login" ? "none" : "block",
          }}
        />
        <Toolbar
          sx={{
            display: pathname === "/login" ? "none" : "block",
          }}
        />

        {props.children}
        {/* <Outlet/> */}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles({
  menuItem: {
    fontSize: 16,
    color: "#2460B8",
  },
})
function MySelect() {
  const classes = useStyles()

  return (
    <Select
      // classes={{ root: classes.select }}
      sx={{
        "& .MuiSelect-select": {
          width: "36px",
          // height: "26px",
          backgroundColor: "#F0F4FA",
          fontSize: 16,
          color: "#2460B8",
          borderStyle: "none",
        },
      }}
      // specify selected value or set to empty string
    >
      <MenuItem value={"eng"}>Eng</MenuItem>
      <MenuItem value={"urd"}>jap</MenuItem>
    </Select>
  )
}
