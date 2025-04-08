import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../utils/contexts/UserContext";

const PublicRoute = ({ redirectPath = "/home" }) => {
  const { user } = useUser();
  return user ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

export default PublicRoute;
