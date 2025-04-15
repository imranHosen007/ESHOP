import Lottie from "react-lottie";
import React from "react";
import animationData from "../../assets/animations/24151-ecommerce-animation.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Lottie options={defaultOptions} width={300} height={300} />
    </div>
  );
};

export default Loader;
