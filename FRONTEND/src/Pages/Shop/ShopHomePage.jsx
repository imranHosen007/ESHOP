import React from "react";
import ShopInfo from "../../Components/Dashboard/ShopDashboard/ShopInfo";
import ShopProfileData from "../../Components/Dashboard/ShopDashboard/ShopProfileData";

const ShopHomePage = () => {
  return (
    <div className="section  bg-[#f5f5f5]">
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="md:w-[72%] rounded-[4px] w-[74%]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
