// ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../utils/contexts/UserContext";
import SimpleLoader from "../../Loader/SimpleLoader";

const ProtectedRoute = ({
  isAllowed,
  isLoading,
  redirectPath = "/login",
  children,
}) => {
  const { user, isLoading: contextLoading } = useUser();
  const loading = isLoading !== undefined ? isLoading : contextLoading;
  // While user state is loading, show a loader
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <SimpleLoader className="h-12" />
      </div>
    );
  }

  // If not allowed, redirect to the specified path
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render nested routes if allowed
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
