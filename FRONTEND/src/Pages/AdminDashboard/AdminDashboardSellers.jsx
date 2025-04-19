import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcDeleteDatabase } from "react-icons/fc";

import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { getAllSeller } from "../../Redux/Api/SellerApi";
import { removeSeller } from "../../Redux/Slice/SellerSlice";
const AdminDashboardSellers = () => {
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { allSeller } = useSelector((store) => store.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(5);

  const newTotalPage = [];
  // ------Pagination---------
  const totalPage = Math.ceil(allSeller.length / itemPerPage);
  const firstIndex = currentPage * itemPerPage;
  const lastIndex = firstIndex - itemPerPage;
  const currentUser = allSeller.slice(lastIndex, firstIndex);

  for (let i = 1; i <= totalPage; i++) {
    newTotalPage.push(i);
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (value) => {
    setCurrentPage(value);
  };
  // ---------Handle-Function------
  const handleDelete = (id) => {
    setButtonLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "Deleted This Seller ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/shop/${id}`)
          .then((res) => {
            if (res.data.success) {
              setButtonLoading(false);
              dispatch(removeSeller(id));
              toast.success(res.data.message);
            }
          })
          .catch((error) => {
            setButtonLoading(false);
            toast.error(error?.data?.response?.message);
          });
      }
    });
  };

  useEffect(() => {
    dispatch(getAllSeller());
  }, [dispatch]);
  return (
    <div>
      <ToastContainer />
      <h1 className="my-10 text-4xl font-bold text-center">Manage Sellrs</h1>
      <div className="w-full">
        <div className="p-6 mb-4 overflow-x-auto bg-white">
          <table className="w-full text-sm text-left">
            <thead className="">
              <tr>
                <th className="px-4 font-semibold text-left">Photo</th>
                <th className="px-4 font-semibold text-left"> Name</th>
                <th className="px-4 font-semibold text-left"> Email</th>
                <th className="px-4 font-semibold text-left">
                  AvailableBalance
                </th>
                <th className="px-4 font-semibold text-left">Joined On</th>
                <th className="px-4 font-semibold text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {allSeller.length === 0 ? (
                <tr>
                  <td
                    colSpan={"5"}
                    className="mt-5 text-2xl font-bold text-center"
                  >
                    No Seller Found
                  </td>
                </tr>
              ) : (
                currentUser.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className="transition duration-200 ease-in-out border-b border-neutral-500"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={user.avatar?.url}
                          alt=""
                          className="w-[50px] h-[50px] rounded-sm"
                        />
                      </td>
                      <td className="px-4 py-4 whitespace-pre-wrap">
                        {user.name}
                      </td>{" "}
                      <td className="px-4 py-4 whitespace-pre-wrap">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span>{user.availableBalance}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span>{user.createdAt.slice(0, 10)}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={user?.role !== "admin" || buttonLoading}
                          className="inline-flex items-center gap-2 px-2 py-1 font-semibold text-white bg-red-600 rounded-md disabled:bg-slate-500"
                        >
                          Delete <FcDeleteDatabase className="text-white" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      {currentPage > 1 && (
        <div className="flex items-center justify-center py-10">
          <nav
            aria-label="Pagination"
            className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800"
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              type="button"
              className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300 disabled:bg-gray-500 "
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            {newTotalPage.map((num, index) => {
              return (
                <button
                  onClick={() => handleChange(num)}
                  key={index}
                  type="button"
                  aria-current="page"
                  className={`inline-flex items-center px-4 py-2 text-sm font-semibold border border-gray-300   ${
                    index + 1 === currentPage && "bg-secondary text-white "
                  }`}
                >
                  {num}
                </button>
              );
            })}
            <button
              disabled={currentPage === totalPage}
              onClick={handleNext}
              type="button"
              className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300 disabled:bg-gray-500"
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardSellers;
