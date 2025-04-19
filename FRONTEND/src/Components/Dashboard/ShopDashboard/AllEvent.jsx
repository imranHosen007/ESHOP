import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Loader from "../../Loader/Loader";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { getShopEvent } from "../../../Redux/Api/EventApi";
import { deleteEvent } from "../../../Redux/Slice/EventSlice";
import { FaEdit } from "react-icons/fa";

const AllEvent = () => {
  const dispatch = useDispatch();
  const { event, isLoading } = useSelector((store) => store.event);
  const { seller } = useSelector((store) => store.seller);
  const axiosPublic = useAxiosPublic();
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(getShopEvent(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "Delete This Event",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/event/${id}`)
          .then((res) => {
            if (res.data.success === true) {
              setDeleteLoading(false);
              dispatch(deleteEvent(id));

              Swal.fire({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            setDeleteLoading(false);
            toast.error(error.response.data.message);
          });
      }
    });
  };

  // ---------Paginaion-----
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const totalPage = Math.ceil(event.length / itemsPerPage);
  const firstIndex = currentPage * itemsPerPage;
  const lastIndex = firstIndex - itemsPerPage;
  const currentItems = event.slice(lastIndex, firstIndex);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="flex justify-center p-4">
      <div className="w-full bg-white h-[85vh]">
        <div className="overflow-x-auto ">
          <table className="w-full text-sm text-left rounded-sm ">
            <thead className="">
              <tr>
                <th className="p-4 font-semibold text-left">#</th>
                <th className="p-4 font-semibold text-left">Event Name</th>
                <th className="p-4 font-semibold text-left">Price</th>
                <th className="p-4 font-semibold text-left">Stock</th>
                <th className="p-4 font-semibold text-left">Sold Out</th>
                <th className="p-4 font-semibold text-left">Edit</th>
                <th className="p-4 font-semibold text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {event.length === 0 ? (
                <tr>
                  <td
                    colSpan={"7"}
                    className="py-10 mt-5 text-2xl font-bold text-center"
                  >
                    Currently Not Evnet Found
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="transition duration-200 ease-in-out border-b border-black bg-slate-200"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {item.name.length > 40
                          ? item.name.slice(0, 40) + "..."
                          : item.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {item.discountPrice}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {item.stock}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {item.sold_out}
                      </td>
                      <td className="px-4 py-4 0 whitespace-nowrap">
                        <Link to={`/dashboard/edit-event/${item._id}`}>
                          <button>
                            <FaEdit size={20} />
                          </button>
                        </Link>
                      </td>
                      <td className="px-4 py-4 md:px-0 whitespace-nowrap">
                        <button
                          disabled={deleteLoading}
                          onClick={() => handleDelete(item._id)}
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {currentPage > 1 && (
          <div className="flex items-center justify-center py-10">
            <button
              className="p-1 text-white transition duration-200 bg-indigo-600 cursor-pointer hover:bg-gray-400 hover:text-black"
              onClick={handlePrev}
            >
              <MdOutlineKeyboardArrowLeft size={30} />
            </button>
            <div className="inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300 ">
              {currentPage} Of {totalPage}
            </div>
            <button
              className="p-1 text-white transition duration-200 bg-indigo-600 cursor-pointer hover:bg-gray-400 hover:text-black"
              onClick={handleNext}
            >
              <MdOutlineKeyboardArrowRight size={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvent;
