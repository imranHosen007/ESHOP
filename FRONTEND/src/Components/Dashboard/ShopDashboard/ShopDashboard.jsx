import React, { useEffect } from "react";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shopGetProducts } from "../../../Redux/Api/ProductApi";
import { getOrderByShop } from "../../../Redux/Api/OrderApi";
import { FaArrowRight } from "react-icons/fa";

const ShopDashboard = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store.product);
  const { seller } = useSelector((store) => store.seller);
  const { allOrder } = useSelector((store) => store.order);

  useEffect(() => {
    dispatch(shopGetProducts(seller._id));
    dispatch(getOrderByShop(seller._id));
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
              Account Balance{" "}
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
            <MdBorderClear size={30} className="mr-2" fill="#00000085" />
            <h3
              className={` !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders{" "}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {allOrder && allOrder?.length}
          </h5>
          <Link to={`/dashboard/order`}>
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
            {product && product.length}
          </h5>
          <Link to={`/dashboard/products`}>
            <h5 className="pt-4 pl-[2] text-[#077f9c]">View Products</h5>
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
              {allOrder?.length === 0 ? (
                <tr>
                  <td
                    colSpan={"5"}
                    className="pb-2 mt-5 text-2xl font-bold text-center"
                  >
                    Currently Not Order Found
                  </td>
                </tr>
              ) : (
                allOrder.slice(0, 5).map((item, index) => {
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

export default ShopDashboard;
