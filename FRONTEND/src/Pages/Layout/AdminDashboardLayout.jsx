import React from "react";

import { MdBorderClear, MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrWorkshop } from "react-icons/gr";
import { BsHandbag } from "react-icons/bs";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CiMoneyBill } from "react-icons/ci";

const dashboardItems = [
  {
    name: "Dashboard",
    link: "/admin/home",
    icon: <RxDashboard />,
  },
  {
    name: "Manage Users",
    link: "/admin/users",
    icon: <HiOutlineUserGroup />,
  },
  {
    name: "Manage Sellers",
    link: "/admin/sellers",
    icon: <GrWorkshop />,
  },
  {
    name: "Manage Products",
    link: "/admin/products",
    icon: <BsHandbag />,
  },

  {
    name: "Manage Events",
    link: "/admin/events",
    icon: <MdOutlineLocalOffer />,
  },
  {
    name: "All Orders",
    link: "/admin/orders",
    icon: <MdBorderClear />,
  },
  {
    name: "Withdraw Request",
    link: "/admin/withdraws",
    icon: <CiMoneyBill />,
  },
];

const AdminDashboardLayout = () => {
  return (
    <div>
      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="w-[80px] md:w-[330px]">
          <div className="w-full bg-white shadow-sm h-[90vh] z-10 overflow-y-scroll sticky top-0 left-0">
            <div className="p-4">
              {" "}
              <Link to={`/`}>
                <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" />
              </Link>
            </div>

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
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
