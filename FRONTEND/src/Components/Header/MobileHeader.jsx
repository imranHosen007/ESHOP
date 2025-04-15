import React from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";

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
const MobileHeader = ({
  open,
  setOpen,
  active,
  searchTerm,
  handleSearchChange,
  searchData,
  openCart,
  setOpenCart,
  setOpenWishlist,
  openWishlist,
}) => {
  const { isAtuhenticated, user } = useSelector(store => store.user);
  const { cart } = useSelector(store => store.cart);
  return (
    <div
      className={`${
        active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
      }  w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm md:hidden`}
    >
      <div className="flex items-center justify-between">
        <div>
          {" "}
          <BiMenuAltLeft
            className="ml-4"
            size={40}
            onClick={() => setOpen(!open)}
          />
        </div>
        <div>
          <Link to="/">
            <img
              src="https://shopo.quomodothemes.website/assets/images/logo.svg"
              alt=""
              className="mt-3 cursor-pointer"
            />
          </Link>
        </div>
        <div onClick={() => setOpenCart(true)} className="relative  mr-[20px]">
          <AiOutlineShoppingCart size={30} />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
            {cart?.length}
          </span>
        </div>
      </div>

      {/* ------Mobile-Menu-SideBar------- */}
      {open && (
        <div className="fixed  w-full  bg-[#0000005f] z-20 h-full  top-0 left-0">
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="flex items-center justify-between w-full pr-3">
              <div>
                <div
                  onClick={() => setOpenWishlist(true)}
                  className="relative  mr-[15px]"
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    0
                  </span>
                </div>
              </div>
              <RxCross1
                size={30}
                onClick={() => setOpen(!open)}
                className="mt-5 ml-4 cursor-pointer"
              />
            </div>
            {/* --------Serach----- */}
            <div className="relative w-11/12 my-8  m-auto h-[40px">
              <input
                value={searchTerm}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />

              {searchData && (
                <div className="bg-[#fff]  z-10 shadow w-full  p-3 absolute left-0">
                  {searchData.map((item, index) => {
                    return (
                      <Link
                        to={`/products/${item?._id}`}
                        className="flex items-center py-2 border-b border-green-600"
                      >
                        <img
                          // src={item?.image_Url[0]?.url}
                          src=""
                          alt=""
                          className="w-[50px] mr-2"
                        />
                        <h5>{item.name}</h5>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            {/* ------NAvItems----- */}
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
                            isActive ? "text-[#17dd1f] " : "text-black "
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
            {/* ----Become-Seller------ */}
            <div className="mt-4 ml-8 btn">
              <Link to={"/shop-create"}>
                <h1 className="text-[#fff]  flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <br />

            <div className="pl-8 ">
              {isAtuhenticated ? (
                <Link to="/profile">
                  <img
                    src={`${user.avatar} `}
                    alt=""
                    className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                  />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7]"
                  >
                    Login /
                  </Link>
                  <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {openCart ? <Cart setOpenCart={setOpenCart} openCart={openCart} /> : null}
      {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
    </div>
  );
};

export default MobileHeader;
