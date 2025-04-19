import React from "react";
import CheckOutStep from "../../Components/CheckOut/CheckOutStep";
import animationData from "../../assets/animations/107043-success.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
const OrderSuccesFull = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-full  bg-[#f6f9fc]">
      <CheckOutStep active={3} />
      <div>
        <Lottie options={defaultOptions} width={300} height={200} />{" "}
        <div className="flex flex-col items-center justify-center max-w-2xl pb-6 mx-auto space-y-4">
          {" "}
          <h5 className="text-center  text-[25px] text-[#000000a1]">
            Your order is successful 😍
          </h5>
          <p className="max-w-2xl text-xl text-center text-slate-500">
            Your order will be processed within 24 hours during working days. We
            will notify you by email once your order has been shipped.
          </p>
          <a href="/">
            <button className="w-[170px] bg-blue-600 text-white font-semibold h-[50px]  my-3 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-800 duration-150">
              Retrun to Shopping
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccesFull;
