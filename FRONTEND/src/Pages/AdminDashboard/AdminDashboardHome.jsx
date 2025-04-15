import React, { useEffect, useState } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear, MdOutlineLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FaArrowRight, FaUsers } from "react-icons/fa";
import { getAllProducts } from "../../Redux/Api/ProductApi";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { getAllSeller } from "../../Redux/Api/SellerApi";
import { getAllUser } from "../../Redux/Api/UserApi";
import { getAllEvent } from "../../Redux/Api/EventApi";
import { getAllOrder } from "../../Redux/Api/OrderApi";
import { GrWorkshop } from "react-icons/gr";

const AdminDashboardHome = () => {
  const dispatch = useDispatch();

  const { allProduct } = useSelector(store => store.product);
  const { allSeller } = useSelector(store => store.seller);
  const { allUser } = useSelector(store => store.user);
  const { allEvent } = useSelector(store => store.event);
  const { AllOrder } = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllSeller());
    dispatch(getAllUser());
    dispatch(getAllEvent());
    dispatch(getAllOrder());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 sm:grid-cols-2">
        <div className=" sm:min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Total Earning
              <span className="text-[16px]">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">$2035</h5>
          <Link to={`/dashboard/withdraw-money`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link>
        </div>
        <div className=" sm:min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <FaUsers size={30} className="mr-2" fill="#00000085" />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Users
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allUser && allUser?.length}
          </h5>
          <Link to={`/admin/users`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Show Users</h5>
          </Link>
        </div>{" "}
        <div className=" sm:min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <GrWorkshop size={30} className="mr-2" fill="#00000085" />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Sellers
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allSeller && allSeller?.length}
          </h5>
          <Link to={`/admin/sellers`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">show Sellers</h5>
          </Link>
        </div>{" "}
        <div className=" sm:min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {AllOrder && AllOrder.length}
          </h5>
          <Link to={`/admin/orders`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Views Orders</h5>
          </Link>
        </div>
        <div className=" sm:min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <AiOutlineMoneyCollect
              size={30}
              className="mr-2"
              fill="#00000085"
            />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Product
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allProduct && allProduct.length}
          </h5>
          <Link to={`/admin/products`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">View Products</h5>
          </Link>
        </div>{" "}
        <div className=" sm:min-h-[20vh] bg-white shadow rounded px-2 py-5">
          <div className="flex items-center">
            <MdOutlineLocalOffer size={30} className="mr-2" fill="#00000085" />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Events
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allEvent && allEvent.length}
          </h5>
          <Link to={`/admin/events`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">View Events</h5>
          </Link>
        </div>
      </div>
      {/* -Latest-Order------ */}
      <h3 className="text-[22px] font-Poppins pb-2 mt-10">Latest 5 Orders</h3>
      <div className="w-full px-6">
        <div className="mb-4 overflow-x-auto bg-white border border-black rounded 0 ">
          <table className="w-full text-sm text-left">
            <thead className="">
              <tr>
                <th className="p-4 font-semibold text-left">Order Id</th>
                <th className="p-4 font-semibold text-left">Status</th>
                <th className="p-4 font-semibold text-left">Items Quantity</th>
                <th className="px-4 font-semibold text-left">Total</th>
                <th className="px-4 font-semibold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {AllOrder?.length === 0 ? (
                <tr>
                  <td
                    colSpan={"5"}
                    className="pb-2 mt-5 text-2xl font-bold text-center"
                  >
                    Currently Not Order Found
                  </td>
                </tr>
              ) : (
                AllOrder.slice(0, 5).map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="transition duration-200 ease-in-out bg-white border-t border-black"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-pre-wrap">
                        <p
                          className={`${
                            item.status === "Processing"
                              ? "text-orange-400"
                              : item.status ===
                                "Transferred to delivery partner"
                              ? "text-yellow-500"
                              : item.status === "Delivered"
                              ? "text-green-600"
                              : null
                          }`}
                        >
                          {" "}
                          {item?.status}
                        </p>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap ">
                        {item?.cart.reduce((sum, acc) => sum + acc.quantity, 0)}
                      </td>{" "}
                      <td className="px-4 py-4 whitespace-nowrap">
                        ${item?.totalPrice}
                      </td>{" "}
                      <Link to={`/dashboard-order/${item._id}`}>
                        {" "}
                        <td className="inline-block px-4 py-4 cursor-pointer whitespace-nowrap hover:bg-gray-400">
                          <FaArrowRight size={15} />
                        </td>
                      </Link>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
