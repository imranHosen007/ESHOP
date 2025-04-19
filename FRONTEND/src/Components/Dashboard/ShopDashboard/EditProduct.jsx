import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllProducts } from "../../../Redux/Api/ProductApi";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const EditProduct = () => {
  const { allProduct } = useSelector((store) => store.product);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [orginalPrice, setOrginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const disptach = useDispatch();
  const axiosPublic = useAxiosPublic();

  const { id } = useParams();

  const handleSubmit = (e) => {
    setButtonLoading(true);
    e.preventDefault();
    const updatedData = {
      name,
      stock,
      discountPrice,
      orginalPrice,
      description,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Update This Product ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/product/${id}`, updatedData)
          .then((res) => {
            if (res.data.success) {
              setButtonLoading(false);
              Swal.fire({
                title: "Updated SuccesFull",
                text: res.data.message,
                icon: "success",
              });
              navigate("/dashboard/products");
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
    disptach(getAllProducts());
    const p = allProduct && allProduct.find((item) => item._id == id);
    setName(p.name);
    setStock(p.stock);
    setDescription(p.description);
    setOrginalPrice(p.originalPrice);
    setDiscountPrice(p.discountPrice);
  }, [disptach]);

  return (
    <div>
      <ToastContainer />
      <h1 className="py-6 text-2xl font-bold text-center">
        Update Product Information
      </h1>
      <div className="w-full px-5 mt-5">
        <form onSubmit={handleSubmit} aria-aria-required={true}>
          {/* 1st-Col */}
          <div className="w-full pb-3 md:flex">
            <div className="w-full md:w-1/2">
              <label className="block pb-2" htmlFor="name">
                Product Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                className="formInput !w-[95%] mb-4 md:mb-0"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block pb-2" htmlFor="email">
                Stock
              </label>
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                type="number"
                id="email"
                className="formInput !w-[95%] mb-4 md:mb-0"
              />
            </div>
          </div>
          {/* 2nd-col */}
          <div className="w-full pb-3 md:flex">
            <div className="w-full md:w-1/2">
              <label className="block pb-2" htmlFor="orginalPrice">
                Orginal Price
              </label>
              <input
                onChange={(e) => setOrginalPrice(e.target.value)}
                value={orginalPrice}
                type="number"
                id="orginalPrice"
                className="formInput !w-[95%] mb-4 md:mb-0"
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block pb-2" htmlFor="phone">
                Price (With Discount)
              </label>
              <input
                onChange={(e) => setDiscountPrice(e.target.value)}
                value={discountPrice}
                placeholder="Enter Your Price"
                type="number"
                id="phone"
                className="formInput !w-[95%] mb-4 md:mb-0"
              />
            </div>
          </div>
          {/* 3nd-Col */}
          <div className="w-full pb-3">
            <label className="block pb-1" htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              value={description}
              className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none sm:text-sm"
              placeholder="Enter your product description..."
              required
              rows="8 "
              cols="30"
            ></textarea>{" "}
          </div>

          <div className="w-full">
            {" "}
            <button
              disabled={buttonLoading}
              type="submit"
              className="h-[40px] border hover:border-[#3a24db] hover:text-[#3a24db] rounded-[3px] mt-8 cursor-pointer disabled:cursor-not-allowed bg-[#3a24db] text-white hover:bg-transparent duration-200 w-[250px] "
            >
              {buttonLoading ? (
                <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
