import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageAltDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

const dashboardItems = [
  {
    name: "Dashboard",
    link: "/dashboard/home",
    icon: <RxDashboard />,
  },
  {
    name: "All Order",
    link: "/dashboard/order",
    icon: <FiShoppingBag />,
  },
  {
    name: "All Products",
    link: "/dashboard/products",
    icon: <FiPackage />,
  },
  {
    name: "Create Product",
    link: "/dashboard/create-products",
    icon: <AiOutlineFolderAdd />,
  },
  {
    name: "All Events",
    link: "/dashboard/event",
    icon: <MdOutlineLocalOffer />,
  },
  {
    name: "Create Event",
    link: "/dashboard/create-event",
    icon: <VscNewFile />,
  },
  {
    name: "Withdraw Money",
    link: "/dashboard/withdraw-money",
    icon: <CiMoneyBill />,
  },
  {
    name: "Shop Inbox",
    link: "/dashboard/messages",
    icon: <BiMessageAltDetail />,
  },
  {
    name: "Discount Codes",
    link: "/dashboard/coupouns",
    icon: <AiOutlineGift />,
  },
  {
    name: "Refunds",
    link: "/dashboard/refunds",
    icon: <HiOutlineReceiptRefund />,
  },
  {
    name: "Settings",
    link: "/dashboard/settings",
    icon: <CiSettings />,
  },
];
const DashboardSidebar = () => {
  return (
    <div className="w-full bg-white shadow-sm h-[90vh] z-10 overflow-y-scroll sticky top-0 left-0">
      {dashboardItems.map((item, index) => {
        return (
          <div key={index} className="flex items-center w-full p-4">
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `${
                  isActive ? "text-[#DC143C] " : "text-[#555]"
                } w-full flex items-center `
              }
            >
              <span className={`text-2xl `}>{item.icon}</span>
              <h5
                className={`hidden md:block pl-2 text-[18px] font-[400] 
              `}
              >
                {item.name}
              </h5>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
