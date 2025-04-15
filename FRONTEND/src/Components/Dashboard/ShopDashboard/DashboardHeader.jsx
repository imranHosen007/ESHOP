import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const { seller } = useSelector(store => store.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      {/* ---logo--- */}
      <div>
        <Link to={`/`}>
          <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" />
        </Link>
      </div>
      {/* ----Menu---- */}
      <div>
        <div className="flex items-center gap-2">
          <Link to="/dashboard/coupouns" className="hidden md:block">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/event" className="hidden md:block">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/products" className="hidden md:block">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard/order" className="hidden md:block">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>{" "}
          <Link to="/dashboard/messages" className="hidden md:block">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>{" "}
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller?.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
