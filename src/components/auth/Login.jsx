import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  FormHelperText,
  FormLabel,
  Container,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Logo from "../../assets/weblogo.png"
import BannerImage from "../../assets/loginBanner.png"
import { useNavigate } from "react-router-dom"
import { useSigninUserMutation } from "../../store/services/auth/auth.services"
import Cookies from "js-cookie"
export const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [signinUser, { isLoading, isError, isSuccess, status, data, error }] =
    useSigninUserMutation()
  const [apiErrorMessage, setApiErrorMessage] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault()

    let isValid = true

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Email is invalid")
      isValid = false
    } else {
      setEmailError("")
    }
    if (
      !password
      //  ||
      // !/^(?=.*[A-Z])[^\d]*$/.test(password)
    ) {
      setPasswordError("Password is invalid")
      isValid = false
    } else {
      setPasswordError("")
    }

    if (isValid) {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("password", password)
      signinUser(formData)
    }
  }

  useEffect(() => {
    if (isSuccess && data !== "Invalid username or password") {
      Cookies.set("access_token", data?.data, {
        // httpOnly: true,
        // secure: true,
      })
      setApiErrorMessage("")
      navigate("/dashboard")
    }
  }, [isSuccess])
  useEffect(() => {
    if (data) {
      if (data === "Invalid username or password") {
        setApiErrorMessage("Invalid username or password")
      } else {
        setApiErrorMessage("")
      }
    }
  }, [data])

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
        mx: { xs: "1rem", sm: "6rem", md: "0rem" },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "47.3%",
          bgcolor: "#F8F8FF",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{}}>
          <Box
            component='img'
            src={Logo}
            sx={{ mt: "3rem", ml: "4.4375rem", width: "12.5rem" }}
          />
          <Typography
            sx={{
              fontSize: "2.25rem",
              color: "#202020",
              fontWeight: 500,
              lineHeight: "3.375rem",
              mt: "9.5rem",
              ml: "4.4375rem",
            }}
          >
            Creating events has never been easier before&nbsp;
            <span style={{ color: "#2460B8" }}>Tiqarte!</span>
          </Typography>
        </Box>
        <Box component='img' src={BannerImage} />
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box component='img' src={Logo} sx={{ mt: "3rem", width: "12.5rem" }} />
        <Typography
          sx={{
            fontSize: "1.8rem",
            color: "#202020",
            fontWeight: 500,
            mt: "2.5rem",
          }}
        >
          Creating events has never been easier before&nbsp;
          <span style={{ color: "#2460B8" }}>Tiqarte!</span>
        </Typography>
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          pt: { xs: "4rem", md: "11.1875rem" },
          bgcolor: { md: "#fff" },
          width: "100%",
          height: "100%",
        }}
      >
        <Container
          sx={{
            "&.MuiContainer-root": {
              p: 0,
              maxWidth: "800px",
            },
          }}
        >
          <Box
            sx={{
              pl: { xs: "0rem", md: "56px" },
              pr: { xs: "0rem", md: "72px" },
            }}
          >
            <Typography
              sx={{
                color: "#202020",
                fontSize: { xs: "1.2rem", md: "1.375rem" },
                fontWeight: 500,
                lineHeight: "2.0625rem",
              }}
            >
              Login to your existing account
            </Typography>
            <Box
              sx={{
                display: { md: "flex" },
                mt: "2rem",
                alignItems: "flex-start",
                gap: { md: "2rem" },
                justifyContent: "space-between",
                // width:"100%"
              }}
            >
              <FormControl fullWidth sx={{ width: { md: "50%" } }}>
                <FormLabel
                  sx={{
                    color: "#707070",
                    fontSize: "14px",
                    fontWeight: 400,
                    ml: "1.5px",
                    mb: "8px",
                  }}
                >
                  Email
                </FormLabel>
                <OutlinedInput
                  onChange={(event) => setEmail(event.target.value)}
                  name={"email"}
                  value={email}
                  // type={type}
                  error={emailError}
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      borderRadius: "1rem",
                      height: "48px",
                      border: "1px solid white",
                      bgcolor: "white",
                      color: "#202020",
                    },
                  }}
                />
                {emailError && (
                  <FormHelperText error={true}>{emailError}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ width: { md: "50%" }, mt: { xs: "2rem", md: "0rem" } }}
              >
                <FormLabel
                  sx={{
                    color: "#707070",
                    fontSize: "14px",
                    fontWeight: 400,
                    ml: "1.5px",
                    mb: "8px",
                  }}
                >
                  Password
                </FormLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  onChange={(event) => setPassword(event.target.value)}
                  name={"password"}
                  value={password}
                  error={!!passwordError}
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      borderRadius: "1rem",
                      height: "48px",
                      border: "1px solid white",
                      bgcolor: "white",
                      color: "#202020",
                    },
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {apiErrorMessage && (
                  <FormHelperText error={true}>
                    {apiErrorMessage}
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Button
              disabled={isLoading}
              fullWidth
              type='submit'
              variant='contained'
              sx={{
                bgcolor: "#2460B8",
                // opacity:0.5,
                color: "white",
                mt: "3.5rem",
                borderRadius: "0.75rem",
                height: "3rem",
                fontSize: "1.125rem",
                fontWeight: 600,
              }}
            >
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
