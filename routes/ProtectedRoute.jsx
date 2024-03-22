import Cookies from "js-cookie"
import React from "react"
import { Route, Navigate, Routes, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const accessToken = Cookies.get("access_token")
  return accessToken ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute
