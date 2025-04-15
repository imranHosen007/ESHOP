import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Slice/CartSlice";
import {
  addToWishlist,
  removeFromWishlit,
} from "../../Redux/Slice/WishlistSlice";
const ProductDeatisCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user, isAtuhenticated } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((store) => store.wishlist);

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (data.stock <= count) {
      return toast.error("Product stock limited!", {
        position: "top-center",
      });
    }
    setCount(count + 1);
  };

  const addToCartHandler = (item) => {
    if (isAtuhenticated === false) {
      return navigate("/login");
    }
    if (item.stock <= item.quantity) {
      return toast.error("Product stock limited!", {
        position: "top-center",
      });
    }
    const cartData = {
      userEmail: user?.email,
      name: item?.name,
      productId: item._id,
      quantity: count,
      shopId: item?.shopId,
      price: item?.discountPrice,
      stock: item.stock,
    };
    axiosPublic
      .post(`/cart`, cartData, { withCredentials: true })
      .then((res) => {
        if (res?.data) {
          dispatch(addToCart(res?.data?.cartData));
          alert("Item added to cart successfully!");
        }
      })
      .catch((error) => {
        return toast.error(error?.response?.data?.message);
      });
  };
  // Add-to-wishlitst
  const handleAddtoWishlst = (item) => {
    setClick(!click);

    if (isAtuhenticated === false) {
      return navigate("/login");
    }

    const wishlistData = {
      userEmail: user?.email,
      name: item?.name,
      productId: item._id,
      shopId: item?.shopId,
      quantity: 1,
      price: item?.discountPrice,
      stock: item.stock,
    };
    axiosPublic
      .post(`/wishlist`, wishlistData, { withCredentials: true })
      .then((res) => {
        if (res?.data) {
          dispatch(addToWishlist(res?.data?.wishlistData));
          alert("Item added to Wishlist successfully!");
        }
      })
      .catch((error) => {
        return toast.error(error?.response?.data?.message);
      });
  };
  const hanldeRemoveFromWishlist = (id) => {
    setClick(!click);
    axiosPublic
      .delete(`/wishlist/${id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success == true) {
          dispatch(removeFromWishlit(id));
          return toast.error("Proudct Remove to Wishlist successfully!", {
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      });
  };

  // ---Send-Seller-Message--
  const handleMessage = () => {
    if (isAtuhenticated === false) {
      return navigate("/login");
    }
    const groupTitle = data._id + user._id;
    const userId = user._id;
    const sellerId = data.shop?._id;
    axiosPublic
      .post(
        "/conversation",
        { groupTitle, userId, sellerId },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          return navigate(`/inbox}`);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      });
  };
  useEffect(() => {
    const findWishlist = wishlist.find((i) => {
      return i.productId === data._id;
    });

    if (findWishlist) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);
  return (
    <div className="bg-white ">
      <ToastContainer />
      {data ? (
        <div className="fixed w-full flex justify-center items-center h-screen top-0 left-0 bg-[#00000030] z-40">
          <div className="w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute z-50 right-3 top-3"
              onClick={() => setOpen(false)}
            />
            <div className="w-full md:flex">
              <div className="w-full md:w-1/2">
                <img src={`${data && data?.images[0]?.url}`} alt="" />
                <div>
                  <Link
                    to={`/shop/preview/${data.shop._id}`}
                    className="flex items-center"
                  >
                    <img
                      src={data.shop?.avatar?.url}
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className="pt-3 text-[15px] text-blue-400 pb-3">
                        {" "}
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        {data?.ratings} Ratings
                      </h5>
                    </div>
                  </Link>
                  <div className="btn  bg-[#000] text-white mt-4 rounded-[4px] h-11">
                    <button
                      onClick={handleMessage}
                      className="flex items-center gap-2"
                    >
                      {" "}
                      Send Message <AiOutlineMessage className="ml-1" />
                    </button>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5">
                    ( {data.sold_out}) {""}Sold out
                  </h5>
                </div>
              </div>
              {/* -----Right-Side----- */}
              <div className="w-full md:w-1/2 pt-5 px-1.5">
                <h1
                  className={` font-[600] font-Roboto text-[#333] text-[20px]`}
                >
                  {data.name}
                </h1>
                <p className="my-2 text-gray-400">{data.description}</p>
                <div className="flex ">
                  <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
                    {data.discountPrice && data?.discountPrice >= 0
                      ? data?.discountPrice
                      : data?.originalPrice}
                    $
                  </h5>
                  <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
                    {data.price ? data.price + "$" : null}
                  </h4>
                </div>
                <div className="flex items-center justify-between pr-3 mt-12">
                  <div>
                    <button
                      disabled={count == 1}
                      onClick={decrementCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-1.5 shadow-lg hover:opacity-75 transition duration-300 ease-in-out disabled:!bg-slate-600"
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[7px]">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-1.5 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        onClick={() => hanldeRemoveFromWishlist(data._id)}
                        size={30}
                        className="cursor-pointer"
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => handleAddtoWishlst(data)}
                        size={30}
                        className="cursor-pointer"
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div className="btn mt-6 rounded-[4px] h-11 flex items-center text-white">
                  <button
                    onClick={() => addToCartHandler(data)}
                    className="flex items-center"
                  >
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDeatisCard;
