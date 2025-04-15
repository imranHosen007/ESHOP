import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProjectedRoutes = ({ children }) => {
  const { isLoading, isAtuhenticated } = useSelector(store => store.user);
  const location = useLocation();
  if (isLoading === false) {
    if (isAtuhenticated === false) {
      return (
        <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
      );
    }
  }
  return children;
};

export default ProjectedRoutes;
