import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import DropDownCategory from "./DropDownCategory";
import { useSelector } from "react-redux";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

const categoriesData = [
  {
    id: 1,
    title: "Computers and Laptops",
    subTitle: "",
    image_Url:
      "https://cdn.shopify.com/s/files/1/1706/9177/products/NEWAppleMacbookProwithM1ProChip14InchLaptop2021ModelMKGQ3LL_A_16GB_1TBSSD_custommacbd.jpg?v=1659592838",
  },
  {
    id: 2,
    title: "cosmetics and body care",
    subTitle: "",
    image_Url:
      "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-07/kosme1.png",
  },
  {
    id: 3,
    title: "Accesories",
    subTitle: "",
    image_Url:
      "https://img.freepik.com/free-vector/ordering-goods-online-internet-store-online-shopping-niche-e-commerce-website-mother-buying-babies-clothes-footwear-toys-infant-accessories_335657-2345.jpg?w=2000",
  },
  {
    id: 4,
    title: "Cloths",
    subTitle: "",
    image_Url:
      "https://www.shift4shop.com/2015/images/industries/clothing/clothing-apparel.png",
  },
  {
    id: 5,
    title: "Shoes",
    subTitle: "",
    image_Url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvBQPQMVNRd6TtDkGs2dCri0Y-rxKkFOiEWw&usqp=CAU",
  },
  {
    id: 6,
    title: "Gifts",
    subTitle: "",
    image_Url:
      "https://securecdn.pymnts.com/wp-content/uploads/2014/11/Gifts-Photo-700x489.jpg",
  },
  {
    id: 7,
    title: "Pet Care",
    subTitle: "",
    image_Url: "https://cdn.openpr.com/T/c/Tc15444071_g.jpg",
  },
  {
    id: 8,
    title: "Mobile and Tablets",
    subTitle: "",
    image_Url:
      "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg",
  },
  {
    id: 9,
    title: "Music and Gaming",
    subTitle: "",
    image_Url:
      "https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png",
  },
  {
    id: 10,
    title: "Others",
    subTitle: "",
    image_Url:
      "https://searchspring.com/wp-content/uploads/2022/10/Hero-Image-Platform-Others-2.png",
  },
];
const BottomNavbar = ({
  dropDown,
  setDropDown,
  active,
  setActive,
  openCart,
  handleSearchChange,
  setOpenWishlist,
  openWishlist,
  setOpenCart,
}) => {
  const { isAtuhenticated, user } = useSelector(store => store.user);
  const { cart } = useSelector(store => store.cart);
  const { wishlist } = useSelector(store => store.wishlist);

  useEffect(() => {
    const scrollFun = window.addEventListener("scroll", () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", scrollFun);
    };
  }, []);

  return (
    <div
      className={`bg-[rgb(51,33,200)] hidden transition md:flex justify-between items-center w-full ${
        active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
      }`}
    >
      <div className="relative flex items-center justify-between section">
        {/* ----Categories---- */}
        <div className="hidden lg:block" onClick={() => setDropDown(!dropDown)}>
          <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button className="h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md">
              {" "}
              All Categories
            </button>
            {dropDown ? (
              <IoIosArrowDown
                className="absolute hidden cursor-pointer lg:block right-2 top-4"
                onClick={() => setDropDown(!dropDown)}
              />
            ) : (
              <IoIosArrowUp
                className="absolute hidden cursor-pointer right-2 lg:block top-4"
                onClick={() => setDropDown(!dropDown)}
              />
            )}
            {dropDown ? (
              <DropDownCategory
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>
        </div>
        {/* ----NAvItems----- */}
        <div>
          <div className={`md:flex items-center block`}>
            {navItems.map((item, index) => {
              return (
                <div key={index}>
                  <NavLink
                    key={index}
                    to={item.url}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-[#17dd1f] "
                          : "text-black md:text-white"
                      } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer `
                    }
                  >
                    {item.title}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>

        {/* -----Icon-Items------- */}
        <div className="flex">
          <div
            className="relative cursor-pointer mr-[15px]"
            onClick={() => setOpenWishlist(true)}
          >
            <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
              {wishlist?.length}
            </span>
          </div>
          <div
            className="relative cursor-pointer mr-[15px]"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
              {cart?.length}
            </span>
          </div>
          <div className="relative cursor-pointer mr-[15px]">
            {isAtuhenticated ? (
              <Link to="/profile">
                <img
                  src={user?.avatar?.url}
                  alt=""
                  className="w-[35px] h-[35px] rounded-full"
                />
              </Link>
            ) : (
              <Link to={"/login"}>
                {" "}
                <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
              </Link>
            )}
          </div>
        </div>
        {/* -----WishList-Popup------ */}
        {openWishlist ? (
          <Wishlist
            setOpenWishlist={setOpenWishlist}
            openWishlist={openWishlist}
          />
        ) : null}
        {/* --------Cart-Popup------- */}
        {openCart ? (
          <Cart setOpenCart={setOpenCart} openCart={openCart} />
        ) : null}
      </div>
    </div>
  );
};

export default BottomNavbar;
