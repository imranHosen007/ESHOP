import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailsInfo from "./ProductDetailsInfo";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { addToCart } from "../../Redux/Slice/CartSlice";
import {
  addToWishlist,
  removeFromWishlit,
} from "../../Redux/Slice/WishlistSlice";
import { shopGetProducts } from "../../Redux/Api/ProductApi";
const SingleProductDeatils = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user, isAtuhenticated } = useSelector((store) => store.user);
  const { wishlist } = useSelector((store) => store.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    if (data.stock <= count) {
      alert("imran");
    }
    setCount(count + 1);
  };

  // ------Add-to--Cart-----
  const addToCartHandler = (item) => {
    setButtonLoading(true);
    if (isAtuhenticated === false) {
      setButtonLoading(false);
      return navigate("/login");
    }
    if (item.stock <= item.quantity) {
      setButtonLoading(false);
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
          setButtonLoading(false);
          dispatch(addToCart(res?.data?.cartData));
          alert("Item added to cart successfully!");
        }
      })
      .catch((error) => {
        setButtonLoading(false);
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
      shopId: item?.shopId,
      productId: item._id,
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

  // ------Remove-From-Wishlist-----

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

  // -------handleMessage-----
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
          return navigate(`/inbox`);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      });
  };

  // -----Find-Wishlist-----
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

  useEffect(() => {
    dispatch(shopGetProducts(data?.shopId));
  }, [dispatch]);

  return (
    <>
      {" "}
      <div className="bg-white">
        <ToastContainer />
        {data ? (
          <div className="section md:w-[80%] w-[90%]">
            <div className="w-full py-5">
              <div className="block w-full gap-6 md:flex">
                {/* -----Img-Side------ */}
                {data?.images && (
                  <div className="w-full md:w-1/2">
                    <img
                      src={data?.images[select]?.url}
                      alt=""
                      className="w-[80%] mx-auto "
                    />
                    <div className="grid w-[90%] md:grid-cols-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 mt-3">
                      {data?.images &&
                        data.images.length !== 0 &&
                        data.images.map((image, index) => {
                          return (
                            <div
                              key={index}
                              className={`${
                                select === index
                                  ? "border border-orange-400 "
                                  : "null"
                              } cursor-pointer`}
                            >
                              <img
                                src={image.url}
                                className="h-[200px] overflow-hidden  "
                                alt=""
                                onClick={() => setSelect(index)}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
                {/* -----Text-Side------ */}
                <div className="w-full md:w-1/2">
                  <h1 className="text-[25px] font-[600] font-Roboto text-[#333]">
                    {data.name}
                  </h1>
                  <p className="text-gray-400">{data.description}</p>
                  <div className="flex ">
                    <h5 className="font-bold text-[18px] mt-2 text-[#333] font-Roboto">
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
                        onClick={decrementCount}
                        className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded-l shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-75"
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9px]">
                        {" "}
                        {count}
                      </span>

                      <button
                        onClick={incrementCount}
                        className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded-l shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-75"
                      >
                        +
                      </button>
                    </div>
                    {click ? (
                      <AiFillHeart
                        onClick={() => hanldeRemoveFromWishlist(data._id)}
                        size={30}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                        className="cursor-pointer"
                      />
                    ) : (
                      <AiOutlineHeart
                        onClick={() => handleAddtoWishlst(data)}
                        size={30}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  <button
                    disabled={buttonLoading}
                    onClick={() => addToCartHandler(data)}
                    className="btn !mt-6 !rounded !h-11 flex items-center !disabled:cursor-not-allowed"
                  >
                    {" "}
                    {buttonLoading ? (
                      <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
                    ) : (
                      <span className="flex items-center text-white">
                        Add to cart <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    )}
                  </button>
                  <div className="flex items-center pt-8">
                    <div>
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <img
                          src={`${data?.shop?.avatar?.url}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                      </Link>
                    </div>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <h1 className="pt-1 pb-1  text-[15px] text-blue-400 ">
                          {" "}
                          {data?.shop?.name}
                        </h1>
                      </Link>
                    </div>
                    <button
                      onClick={handleMessage}
                      className=" w-[150px] h-[50px]  my-3 flex items-center justify-center rounded cursor-pointer text-white bg-[#6443d1] "
                    >
                      Send Message <AiOutlineMessage className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ProductDetailsInfo data={data} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SingleProductDeatils;
