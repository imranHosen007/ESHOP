import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdTrackChanges,
} from "react-icons/md";
const orderData = [
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
  {
    _id: 1,
    orderItem: [
      {
        name: "Iphone 14 Pro Max",
      },
    ],
    price: 345,
    orderStatus: "Pending",
  },
];

const TrackOrder = () => {
  // ------Pagination---------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const totalPage = Math.ceil(orderData.length / itemsPerPage);
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
                {orderData.length === 0 ? (
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
                        className="transition duration-200 ease-in-out  bg-gray-200 border-t border-black"
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item._id}
                        </td>
                        <td className="px-4 py-4 whitespace-pre-wrap">
                          {item.orderStatus}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {item.orderItem.length}
                        </td>{" "}
                        <td className="px-4 py-4 whitespace-nowrap">
                          ${(item.price * item.orderItem.length).toFixed(2)}
                        </td>{" "}
                        <Link to={`/user/track/order/${item._id}`}>
                          {" "}
                          <td className="px-4 py-4 whitespace-nowrap hover:bg-gray-400 inline-block cursor-pointer">
                            <MdTrackChanges size={15} />
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

export default TrackOrder;
