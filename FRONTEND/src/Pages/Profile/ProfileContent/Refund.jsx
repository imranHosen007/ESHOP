import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserOrder } from "../../../Redux/Api/OrderApi";

const Refund = () => {
  const dispatch = useDispatch();
  const { order } = useSelector(store => store.order);
  const { user } = useSelector(store => store.user);
  const [orderData, setOrderData] = useState([]);
  // ------Pagination---------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const totalPage = Math.ceil(orderData?.length / itemsPerPage);
  const firstIndex = currentPage * itemsPerPage;
  const lastIndex = firstIndex - itemsPerPage;
  const currentItems = orderData.slice(lastIndex, firstIndex);
  const handlePrev = () => {
    if (currentPage <= 1) {
      setCurrentPage(totalPage);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage == totalPage) {
      setCurrentPage(1);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    dispatch(getUserOrder(user._id));
    const filtered =
      order &&
      order.filter(item => {
        return (
          item.status == "Processing refund" || item.status == "Refund Success"
        );
      });
    setOrderData(filtered);
  }, []);
  return (
    <>
      <div>
        <div className="w-full px-6">
          <div className=" mb-4 overflow-x-auto bg-gray-100 rounded border border-black ">
            <table className="w-full text-sm text-left">
              <thead className="">
                <tr>
                  <th className="p-4 font-semibold text-left">Order ID</th>
                  <th className="p-4 font-semibold text-left">Status</th>
                  <th className="p-4 font-semibold text-left">
                    Items Quantity
                  </th>
                  <th className="px-4 font-semibold text-left">Total</th>
                  <th className="px-4 font-semibold text-left"></th>
                </tr>
              </thead>
              <tbody>
                {orderData?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={"5"}
                      className="mt-5 text-2xl font-bold text-center"
                    >
                      Currently Not Order Found
                    </td>
                  </tr>
                ) : (
                  currentItems?.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="transition duration-200 ease-in-out  bg-gray-200 border-t border-black"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item._id}
                        </td>
                        <td className="px-4 py-4 whitespace-pre-wrap">
                          <p
                            className={`${
                              item.status === "Processing"
                                ? "text-orange-400"
                                : item.status ===
                                  "Transferred to delivery partner"
                                ? "text-yellow-500"
                                : item.status === "Delivered" ||
                                  item.status === "Refund Success"
                                ? "text-green-600"
                                : "text-orange-600"
                            }`}
                          >
                            {item.status}
                          </p>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item.cart.reduce(
                            (sum, acc) => sum + acc.quantity,
                            0
                          )}
                        </td>{" "}
                        <td className="px-4 py-4 whitespace-nowrap">
                          ${item.totalPrice}
                        </td>{" "}
                        <Link to={`/user/order/${item._id}`}>
                          <td className="px-4 py-4 whitespace-nowrap hover:bg-gray-400 inline-block cursor-pointer">
                            <FaArrowRight size={15} />
                          </td>
                        </Link>
                      </tr>
                    );
                  })
                )}
                <tr className="transition duration-200 ease-in-out border-t border-black">
                  <td colSpan={"10"} className=" px-4 py-4">
                    <div className="flex items-center  gap-4 ">
                      {
                        <span>
                          {currentPage} Of {totalPage}
                        </span>
                      }
                      <span className="flex items-center gap-2">
                        <MdOutlineKeyboardArrowLeft
                          size={30}
                          className="hover:bg-gray-400 p-1 cursor-pointer transition duration-200"
                          onClick={handlePrev}
                        />
                        <MdOutlineKeyboardArrowRight
                          size={30}
                          className="hover:bg-gray-400 p-1 cursor-pointer transition duration-200"
                          onClick={handleNext}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refund;
