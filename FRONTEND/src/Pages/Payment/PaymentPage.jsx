import React from "react";
import CheckOutStep from "../../Components/CheckOut/CheckOutStep";
import Payments from "../../Components/Payments/Payments";

export const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <CheckOutStep active={2} />
      <Payments />
    </div>
  );
};
