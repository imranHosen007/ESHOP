import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProjetedRoutes = ({ children }) => {
  const { isSeller, loading } = useSelector((store) => store.seller);
  if (loading === false) {
    if (isSeller === false) {
      return <Navigate to={`/shop-login`} replace />;
    }
  }
  return children;
};

export default SellerProjetedRoutes;
