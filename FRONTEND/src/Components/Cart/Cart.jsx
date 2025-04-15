import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import {
  removeFromCart,
  valueChangeFromCart,
} from "../../Redux/Slice/CartSlice";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector(store => store.cart);

  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();

  const handleRemoveFromCart = id => {
    axiosPublic
      .delete(`/cart/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.success == true) {
          dispatch(removeFromCart(id));
          return toast.error("Proudct Remove to cart successfully!", {
            position: "top-center",
          });
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      });
  };
  const handleIcrement = item => {
    const quantity = { quantity: item.quantity + 1 };
    if (item.stock <= item.quantity) {
      return alert("Product stock limited!");
    }
    axiosPublic
      .put(`/cart/${item._id}`, quantity, { withCredentials: true })
      .then(res => {
        if (res?.data) {
          dispatch(
            valueChangeFromCart({ id: item._id, quantity: item.quantity + 1 })
          );
        }
      })
      .catch(error => toast.error(error.response.data.message));
  };
  const handleDecremnt = item => {
    const quantity = { quantity: item.quantity - 1 };
    if (item.quantity > 1) {
      axiosPublic
        .put(`/cart/${item._id}`, quantity, { withCredentials: true })
        .then(res => {
          if (res?.data) {
            dispatch(
              valueChangeFromCart({ id: item._id, quantity: item.quantity - 1 })
            );
          }
        })
        .catch(error => toast.error(error.response.data.message));
    }
  };

  const totalPrice = cart.reduce(
    (prev, current) => prev + current.quantity * current.price,
    0
  );

  return (
    <>
      <div className="fixed top-0 left-0 bg-[#0000004b] z-50 w-full h-screen">
        <div className="fixed top-0 right-0 w-[80%] md:w-[30%] bg-white h-full overflow-scroll shadow-sm">
          {cart && cart.length === 0 ? (
            <div className="flex items-center justify-center w-full h-screen">
              <div className="fixed flex justify-end w-full pt-5 pr-5 top-3 right-3">
                {" "}
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              <h5>Cart Items is empty!</h5>
            </div>
          ) : (
            <>
              <div className="flex justify-end w-full pt-5 pr-5">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>
              {/* -----Items-Length------ */}
              <div className="flex items-center p-4">
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cart.length} Items
                </h5>
              </div>
              {/* -----Cart-Single-Items---- */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart?.length !== 0 &&
                  cart?.map((item, index) => {
                    return (
                      <div className="p-4 border-b" key={index}>
                        <div className="flex items-center">
                          {/* ---fist-Col--- */}{" "}
                          <div>
                            <button
                              onClick={() => handleIcrement(item)}
                              className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] text-white flex items-center justify-center cursor-pointer disabled:bg-slate-600 disabled:border-b-gray-600"
                            >
                              <HiPlus />
                            </button>
                            <h5 className="text-[13px] ml-2">
                              {item.quantity}
                            </h5>
                            <button
                              disabled={item.quantity === 1}
                              onClick={() => handleDecremnt(item)}
                              className="bg-[#a7abb14f] border border-[#e4434373] rounded-full w-[25px] h-[25px] text-black flex items-center justify-center cursor-pointer disabled:bg-slate-600 disabled:border-b-gray-600"
                            >
                              <HiOutlineMinus color="#7d879c" />
                            </button>
                          </div>
                          {/* ---2nd-Col--- */}{" "}
                          <div>
                            <img
                              src=""
                              className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
                            />
                          </div>
                          {/* ---Third-Col--- */}{" "}
                          <div className="pl-1.5">
                            <h1>{item.name}</h1>
                            <h4 className="font-[400] text-[15px] text-[#00000082]">
                              ${item.price} * {item.quantity}
                            </h4>
                            <h4 className="font-[400] text-[15px] text-[#00000082]">
                              US${item.price * item.quantity}
                            </h4>
                          </div>
                          <RxCross1
                            className="cursor-pointer"
                            onClick={() => handleRemoveFromCart(item._id)}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="px-5 mb-3">
                <Link to={`/checkout`} onClick={() => setOpenCart(false)}>
                  <div className=" bg-[#e44343] rounded-[5px] h-[45px] w-full flex items-center justify-center">
                    <h1 className="text-[#fff] text-[18px] font-[600]">
                      Checkout Now (USD${totalPrice})
                    </h1>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Cart;
