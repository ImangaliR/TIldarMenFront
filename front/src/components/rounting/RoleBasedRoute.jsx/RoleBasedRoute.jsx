import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import TokenService from "../../../services/token.service";

const RoleBasedRoute = ({ allowedRoles, redirectPath = "/home", children }) => {
  const userRole = TokenService.getUserRole();

  // Check if the user's role is allowed
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render children if provided, otherwise render nested routes with Outlet
  return children ? children : <Outlet />;
};

export default RoleBasedRoute;
