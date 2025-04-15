import React from "react";

const CheckOutStep = ({ active }) => {
  return (
    <div className="flex justify-center w-full py-10">
      <div className="w-[90%] md:w-[50%] flex items-center flex-wrap">
        <div className="flex items-center">
          <div className="px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer">
            <span className="text-[#fff] text-[16px] font-[600]">
              1.Shipping
            </span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] md:w-[70px] h-[4px] bg-[#f63b60]"
                : "w-[30px] md:w-[70px] h-[4px] bg-[#FDE1E6]"
            }`}
          ></div>
        </div>
        <div className="flex items-center">
          <div
            className={`${
              active > 1 ? "bg-[#f63b60]" : "bg-[#FDE1E6]"
            } px-[20px] h-[38px] rounded-[20px]  flex items-center justify-center cursor-pointer`}
          >
            <span
              className={`${
                active > 1 ? "text-[#fff]" : "text-[#f63b60]"
              }  text-[16px] font-[600]`}
            >
              2.Payment
            </span>
          </div>
        </div>{" "}
        <div className="flex items-center">
          <div
            className={`${
              active > 2
                ? "w-[30px] md:w-[70px] h-[4px] bg-[#f63b60]"
                : "w-[30px] md:w-[70px] h-[4px] bg-[#FDE1E6]"
            }`}
          />
          <div
            className={`${
              active > 2 ? "bg-[#f63b60]" : "bg-[#FDE1E6]"
            } px-[20px] h-[38px] rounded-[20px]  flex items-center justify-center cursor-pointer`}
          >
            <span
              className={`${
                active > 2 ? "text-[#fff]" : "text-[#f63b60]"
              }  text-[16px] font-[600]`}
            >
              3.Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutStep;
