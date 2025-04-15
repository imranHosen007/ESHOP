import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProjectedRoutes = ({ children }) => {
  const { user, isLoading, isAtuhenticated } = useSelector(store => store.user);
  if (isLoading == false) {
    if (isAtuhenticated == false) {
      return <Navigate to={"/login"} replace />;
    } else if (user?.role !== "admin") {
      return <Navigate to={"/"} replace />;
    }
  }

  return children;
};

export default AdminProjectedRoutes;
