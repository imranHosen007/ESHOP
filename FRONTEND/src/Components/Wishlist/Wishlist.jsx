import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../../Redux/Slice/CartSlice";
import { removeFromWishlit } from "../../Redux/Slice/WishlistSlice";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector(store => store.wishlist);
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const { user } = useSelector(store => store.user);

  const addToCartHandler = item => {
    if (item.stock <= 1) {
      return toast.error("Product stock limited!", {
        position: "top-center",
      });
    }
    const cartData = {
      userEmail: user?.email,
      name: item?.name,
      productId: item.productId,
      quantity: 1,
      shopId: item?.shopId,
      price: item?.price,
      stock: item.stock,
    };
    axiosPublic
      .post(`/cart`, cartData, { withCredentials: true })
      .then(res => {
        if (res?.data) {
          dispatch(addToCart(res?.data?.cartData));
          dispatch(removeFromWishlit(item.productId));
          alert("Item added to cart successfully!");
        }
      })
      .catch(error => {
        return alert(error?.response?.data?.message);
        // return toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div className="fixed top-0 left-0 bg-[#0000004b] z-50 w-full h-screen">
      <ToastContainer />
      <div className="fixed top-0 right-0 w-[80%] md:w-[30%] bg-white h-full overflow-scroll shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="flex items-center justify-center w-full h-screen">
            <div className="fixed flex justify-end w-full pt-5 pr-5 top-3 right-3">
              {" "}
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
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
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            {/* -----Items-Length------ */}
            <div className="flex items-center p-4">
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist?.length} Items
              </h5>
            </div>
            {/* -----Cart-Single-Items---- */}
            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.length !== 0 &&
                wishlist.map((item, index) => {
                  return (
                    <div className="p-4 border-b" key={index}>
                      <div className="flex items-center">
                        {/* ---fist-Col--- */} {/* ---2nd-Col--- */}{" "}
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
                            ${item.price}
                          </h4>
                        </div>
                        <BsCart
                          onClick={() => addToCartHandler(item)}
                          className="items-end cursor-pointer "
                          size={20}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
