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
import { deleteProduct } from "../../../Redux/Slice/ProductSlice";
import { shopGetProducts } from "../../../Redux/Api/ProductApi";
import { FaEdit } from "react-icons/fa";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((store) => store.product);
  const { seller } = useSelector((store) => store.seller);
  const [buttonLoading, setButtonLoading] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    dispatch(shopGetProducts(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    setButtonLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "Delete This Product",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/product/shop-product-delete/${id}`)
          .then((res) => {
            if (res.data.success === true) {
              setButtonLoading(false);
              dispatch(deleteProduct(id));
              Swal.fire({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
              });
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message);
            setButtonLoading(false);
          });
      }
    });
  };

  // ---------Paginaion-----
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const totalPage = Math.ceil(product.length / itemsPerPage);
  const firstIndex = currentPage * itemsPerPage;
  const lastIndex = firstIndex - itemsPerPage;
  const currentItems = product.slice(lastIndex, firstIndex);
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
    return <Loader />;
  }

  return (
    <div className="flex justify-center p-6">
      <div className="w-full bg-white h-[85vh]">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-blue-100 ">
            <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
              <tr>
                <th className="p-4 font-semibold text-left">Image</th>
                <th className="p-4 font-semibold text-left">Product Name</th>
                <th className="p-4 font-semibold text-left">Price</th>
                <th className="p-4 font-semibold text-left">Stock</th>
                <th className="p-4 font-semibold text-left">Sold Out</th>
                <th className="p-4 font-semibold text-left">Edit</th>
                <th className="p-4 font-semibold text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {product.length === 0 ? (
                <tr>
                  <td
                    colSpan={"7"}
                    className="py-10 mt-5 text-2xl font-bold text-center text-black"
                  >
                    Currently Not Product Found
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-white transition duration-200 ease-in-out bg-blue-500 border-b border-blue-400"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img
                          src={item?.images[0]?.url}
                          className="w-[50px] h-[50px]"
                          alt=""
                        />
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
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Link to={`/dashboard/edit-product/${item._id}`}>
                          <button>
                            <FaEdit size={20} />
                          </button>
                        </Link>
                      </td>
                      <td className="px-4 py-4 md:px-0 whitespace-nowrap">
                        <button
                          disabled={buttonLoading}
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
        {product.length !== 0 && currentPage > 1 && (
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

export default AllProducts;
