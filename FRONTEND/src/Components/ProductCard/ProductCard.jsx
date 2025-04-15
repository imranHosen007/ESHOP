import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Rating from "../Product/Rating";
import ProductDeatisCard from "../Product/ProductDeatisCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../Redux/Api/CartApi";
import { addToCart } from "../../Redux/Slice/CartSlice";
import {
  addToWishlist,
  removeFromWishlit,
} from "../../Redux/Slice/WishlistSlice";
import { getUserWishlist } from "../../Redux/Api/WishlistApi";

const ProductCard = ({ item, isAdmin }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { user, isAtuhenticated } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector(store => store.wishlist);
  // ------addToCartHandler-Function------
  const addToCartHandler = item => {
    if (isAtuhenticated === false) {
      return navigate("/login");
    }
    if (item.stock <= 1) {
      return toast.error("Product stock limited!", {
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
  // Add-to-wishlitst
  const handleAddtoWishlst = item => {
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
      .then(res => {
        if (res?.data) {
          dispatch(addToWishlist(res?.data?.wishlistData));
          alert("Item added to Wishlist successfully!");
        }
      })
      .catch(error => {
        return toast.error(error?.response?.data?.message);
      });
  };
  const hanldeRemoveFromWishlist = id => {
    setClick(!click);
    axiosPublic
      .delete(`/wishlist/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.success == true) {
          dispatch(removeFromWishlit(id));
          return toast.error("Proudct Remove to Wishlist successfully!", {
            position: "top-center",
          });
        }
      })
      .catch(error => {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      });
  };
  useEffect(() => {
    dispatch(getUserCart(user?.email));
    dispatch(getUserWishlist(user?.email));
  }, [dispatch]);

  useEffect(() => {
    const findWishlist = wishlist.find(i => {
      return i.productId === item._id;
    });

    if (findWishlist) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  return (
    <div className="bg-white relative w-full  h-[370px] rounded-lg shadow-sm p-3 ">
      <ToastContainer />
      <div className="flex justify-end"></div>
      <Link to={`/products/${item._id}`}>
        <img
          src={item?.images[0]?.url}
          alt=""
          className="w-full h-[170px] object-cover"
        />
      </Link>

      {!isAdmin && (
        <Link to={`/shop/preview/${item?.shop._id}`}>
          <h5 className="pt-3 text-[15px] text-blue-400 pb-3">
            {item.shop.name}
          </h5>
        </Link>
      )}
      <Link>
        <h4 className="pb-3 font-[500]">
          {item.name.length > 40 ? item.name.slice(0, 40) + "..." : item.name}
        </h4>
        <div>
          <Rating rating={item.ratings} />
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex">
            <h5 className="font-bold text-[18px] text-[#333] font-Roboto">
              {item.discountPrice && item?.discountPrice >= 0
                ? item?.discountPrice
                : item?.originalPrice}
              $
            </h5>
            <h4 className="font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through">
              {item?.originalPrice ? item?.originalPrice + "$" : null}
            </h4>
          </div>
          <span>{item?.sold_out} Sold</span>
        </div>
      </Link>
      {/* -----SideBar-------- */}
      {!isAdmin && (
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              onClick={() => hanldeRemoveFromWishlist(item._id)}
              className="absolute cursor-pointer right-2 top-5"
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => handleAddtoWishlst(item)}
              size={22}
              className="absolute cursor-pointer right-2 top-5"
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="absolute cursor-pointer right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="absolute cursor-pointer right-2 top-24"
            onClick={() => addToCartHandler(item)}
            color="#444"
            title="Add to cart"
          />
          {open ? (
            <ProductDeatisCard open={open} setOpen={setOpen} data={item} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
