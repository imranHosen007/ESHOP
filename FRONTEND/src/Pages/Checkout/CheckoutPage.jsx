import React, { useEffect } from "react";
import CheckOutStep from "../../Components/CheckOut/CheckOutStep";
import { Checkout } from "../../Components/CheckOut/Checkout";

const CheckoutPage = () => {
  return (
    <div>
      <CheckOutStep active={1} />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
