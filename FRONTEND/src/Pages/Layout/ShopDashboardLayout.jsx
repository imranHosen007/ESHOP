import React from "react";
import DashboardSidebar from "../../Components/Dashboard/ShopDashboard/DashboardSidebar";
import DashboardHeader from "../../Components/Dashboard/ShopDashboard/DashboardHeader";
import { Outlet } from "react-router-dom";

const ShopDashboardLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] md:w-[330px]">
          <DashboardSidebar active={1} />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardLayout;
