import React, { useEffect } from "react";

import ShopCreate from "../../Components/Shop/ShopCreate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ShopCreatePage = () => {
  const { seller, isSeller } = useSelector(store => store.seller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
