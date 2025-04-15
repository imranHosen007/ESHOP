import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { shopGetProducts } from "../../../Redux/Api/ProductApi";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
const DiscountCodes = () => {
  const [open, setOpen] = useState(false);
  const { product, isLoading } = useSelector((store) => store.product);
  const { seller } = useSelector((store) => store.seller);
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSumbitHandler = (data) => {
    const couponData = {
      name: data.name,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      selectedProducts: data.selectedProducts,
      value: data.value,
      shopId: seller._id,
    };

    axiosPublic
      .post(`/coupon`, couponData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(`Coupon code created successfully!`);
          setOpen(false);
          reset();
        }
      })
      .catch((error) => toast.error(error.response.data.message));
  };
  // ----HandleDelete-----
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/coupon/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.success === true) {
              const updatedCouponCode = couponCode.filter((coupon) => {
                return coupon._id !== id;
              });
              setCouponCode(updatedCouponCode);
              toast.success(res.data.message);
            }
          })
          .catch((error) => toast.error(error.response.data.message));
      }
    });
  };
  // -----Fetch-Product-Data
  useEffect(() => {
    dispatch(shopGetProducts(seller._id));
  }, [dispatch]);

  //  Fetch-Shop-Data
  useEffect(() => {
    axiosPublic
      .get(`/coupon/${seller._id}`)
      .then((res) => {
        setLoading(false);
        setCouponCode(res.data.couponCodes);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  }, [couponCode]);

  if (isLoading || loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center p-6">
      <div className="w-full bg-white h-[85vh]">
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(true)}
            className="btn !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3 text-white"
          >
            Create Coupon Code
          </button>
        </div>
        <div>
          <table className="w-full text-sm text-left rounded-sm ">
            <thead className="">
              <tr>
                <th className="p-4 font-semibold text-left">#</th>
                <th className="p-4 font-semibold text-left">Coupon Code</th>
                <th className="p-4 font-semibold text-left">Value</th>
                <th className="p-4 font-semibold text-left max-w-6">Delete</th>
              </tr>
            </thead>
            <tbody>
              {couponCode.length === 0 ? (
                <tr>
                  <td
                    colSpan={"7"}
                    className="py-10 mt-5 text-2xl font-bold text-center"
                  >
                    Currently Not Evnet Found
                  </td>
                </tr>
              ) : (
                couponCode.map((item, index) => {
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
                        {item.value}
                      </td>

                      <td className="px-4 py-4 max-w-6 whitespace-nowrap">
                        <button onClick={() => handleDelete(item._id)}>
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
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
          <div className="w-[90%] md:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
            <div className="flex justify-end w-full">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>{" "}
            <h5 className="text-[30px] font-Poppins text-center">
              Create Coupon code
            </h5>
            <form onSubmit={handleSubmit(onSumbitHandler)} aria-required="true">
              <div className="pb-3">
                <label className="pb-2" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="crateInput"
                  placeholder="Enter your coupon code name..."
                  {...register("name", { required: "Name is Reqired" })}
                />
                <p className="pt-1 text-red-500 font-semi-bold">
                  {errors.name?.message}
                </p>
              </div>
              <div className="pb-3">
                <label className="pb-2" htmlFor="names">
                  Discount Percentenge <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="names"
                  className="crateInput"
                  placeholder="Enter your coupon code value..."
                  {...register("value", {
                    required: "Discount Percentenge is Reqired",
                  })}
                />
                <p className="pt-1 text-red-500 font-semi-bold">
                  {errors.value?.message}
                </p>
              </div>{" "}
              <div className="pb-3">
                <label className="pb-2" htmlFor="min-amout">
                  Min Amout
                </label>
                <input
                  type="number"
                  name="min-amout"
                  className="crateInput"
                  placeholder="Enter your coupon code min amount..."
                  {...register("minAmount")}
                />
              </div>{" "}
              <div className="pb-3">
                <label className="pb-2" htmlFor="max-amout">
                  Max Amout
                </label>
                <input
                  type="number"
                  name="max-amout"
                  className="crateInput"
                  placeholder="Enter your coupon code max amount..."
                  {...register("maxAmount")}
                />
              </div>
              <div className="pb-3">
                <label className="pb-2" htmlFor="selectedproduct">
                  Selected Product
                </label>
                <select
                  {...register("selectedProduct")}
                  id="selectedproduct"
                  className="w-full mt-2 border h-[35px] rounded-[5px]"
                >
                  <option value="" defaultChecked>
                    Choose a selected product
                  </option>
                  {product &&
                    product.map((item) => {
                      return (
                        <option value={item.name} key={item._id}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <button className="crateInput" type="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DiscountCodes;
