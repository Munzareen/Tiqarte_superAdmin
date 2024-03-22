import PropTypes from "prop-types"
import { Navigate, Outlet } from "react-router-dom"
import MainContent from "../../components/Products/MainContent"

const RouteMiddleware = ({ isProtected }) => {
  return isProtected ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login" }} />
  )
}

RouteMiddleware.propTypes = {
  isProtected: PropTypes.bool,
}

export default RouteMiddleware