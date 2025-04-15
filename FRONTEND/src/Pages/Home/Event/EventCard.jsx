import React from "react";
import CountDown from "./CountDown";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/Slice/CartSlice";
const EventCard = ({ data, active }) => {
  const dispatch = useDispatch();
  const { isAtuhenticated, user } = useSelector(store => store.user);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const addToCartHandler = item => {
    if (isAtuhenticated === false) {
      return navigate("/login");
    }
    if (item.stock < 1) {
      toast.error("Product stock limited!", {
        position: "top-center",
      });
    }
    const cartData = {
      shopId: item?.shopId,
      userEmail: user?.email,
      name: item?.name,
      productId: item._id,
      quantity: 1,
      price: item?.discountPrice,
      stock: item.stock,
    };
    axiosPublic
      .post(`/cart`, cartData, { withCredentials: true })
      .then(res => {
        if (res?.data) {
          dispatch(addToCart(res?.data?.cartData));
          alert("Item added to cart successfully!");
        }
      })
      .catch(error => {
        return toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div
      className={`w-full block bg-white  lg:flex p-2 ${
        active ? "py-8" : "mb-12"
      }`}
    >
      <ToastContainer />
      <div className="w-full m-auto md:w-1/2">
        <img src={data?.images[0]?.url} alt="" className="w-[80%] mx-auto" />
      </div>
      <div className="flex flex-col justify-center w-full lg:w-1/2">
        <h2 className="text-[25px] font-[600] font-Roboto text-[#333]">
          {data.name}
        </h2>
        <p>{data.description}</p>
        <div className="flex items-center justify-between py-2">
          <div className="flex">
            <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
              {data.discountPrice && data?.discountPrice >= 0
                ? data?.discountPrice
                : data?.originalPrice}
              $
            </h5>
            <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {data.originalPrice ? data.originalPrice + "$" : null}
            </h4>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} Sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center gap-2">
          <Link to={`/event/${data._id}`}>
            <button className="text-xl text-white btn font-semi">
              See Details
            </button>
          </Link>
          <button
            onClick={() => addToCartHandler(data)}
            className="text-xl text-white btn font-semi"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
