import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Navigate, useLocation } from "react-router-dom";

const ProjectedRoute = ({ children }) => {
  const { isLoading, isAtuhenticated } = useSelector(store => store.user);
  const location = useLocation();
  if (isLoading === false) {
    if (isAtuhenticated === true) {
      return <Navigate to={"/"} replace></Navigate>;
    }
  }
  return children;
};

export default ProjectedRoute;
