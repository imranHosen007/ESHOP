import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByShop } from "../../../Redux/Api/OrderApi";

const AllOrder = () => {
  const { seller } = useSelector(store => store.seller);
  const { allOrder } = useSelector(store => store.order);
  const dispatch = useDispatch();
  // ------Pagination---------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const totalPage = Math.ceil(allOrder.length / itemsPerPage);
  const firstIndex = currentPage * itemsPerPage;
  const lastIndex = firstIndex - itemsPerPage;
  const currentItems = allOrder.slice(lastIndex, firstIndex);
  const axiosPublic = useAxiosPublic();
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
    dispatch(getOrderByShop(seller._id));
  }, []);

  return (
    <>
      <div>
        <div className="w-full px-6">
          <div className="mb-4 overflow-x-auto bg-gray-100 border border-black rounded ">
            <table className="w-full text-sm text-left">
              <thead className="">
                <tr>
                  <th className="p-4 font-semibold text-left">#</th>
                  <th className="p-4 font-semibold text-left">Status</th>
                  <th className="p-4 font-semibold text-left">
                    Items Quantity
                  </th>
                  <th className="px-4 font-semibold text-left">Total</th>
                  <th className="px-4 font-semibold text-left"></th>
                </tr>
              </thead>
              <tbody>
                {allOrder?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={"5"}
                      className="mt-5 text-2xl font-bold text-center"
                    >
                      Currently Not Order Found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="transition duration-200 ease-in-out bg-gray-200 border-t border-black"
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
                          {item?.cart.reduce(
                            (sum, acc) => sum + acc.quantity,
                            0
                          )}
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
                {currentPage > 1 && (
                  <tr className="transition duration-200 ease-in-out border-t border-black">
                    <td colSpan={"10"} className="px-4 py-4 ">
                      <div className="flex items-center gap-4 ">
                        {
                          <span>
                            {currentPage} Of {totalPage}
                          </span>
                        }
                        <span className="flex items-center gap-2">
                          <MdOutlineKeyboardArrowLeft
                            size={30}
                            className="p-1 transition duration-200 cursor-pointer hover:bg-gray-400"
                            onClick={handlePrev}
                          />
                          <MdOutlineKeyboardArrowRight
                            size={30}
                            className="p-1 transition duration-200 cursor-pointer hover:bg-gray-400"
                            onClick={handleNext}
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllOrder;
