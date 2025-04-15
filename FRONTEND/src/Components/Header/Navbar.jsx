import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import BottomNavbar from "./BottomNavbar";
import MobileHeader from "./MobileHeader";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const { isSeller } = useSelector(store => store.seller);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const { allProduct } = useSelector(store => store.product);
  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredProduct =
      allProduct &&
      allProduct.filter(product => {
        return product.name.toLowerCase().includes(term.toLowerCase());
      });

    setSearchData(filteredProduct);
  };
  return (
    <>
      <div className="section">
        <div className="md:flex items-center justify-between md:my-5 md:h-[50px] hidden">
          <div>
            <Link to={"/"}>
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          {/* ------Search-Box------ */}
          <div className="relative w-1/2">
            <input
              value={searchTerm}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search Product..."
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            {searchData.length === 0 ? (
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
            ) : (
              <RxCross1
                onClick={() => setSearchData("")}
                size={25}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
            )}

            {searchData && searchTerm !== 0 && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] w-full bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData.map((item, index) => {
                  return (
                    <Link
                      to={`/products/${item?._id}`}
                      onClick={() => setSearchData("")}
                      key={index}
                    >
                      <div className="flex items-start w-full py-3">
                        <img
                          // src={item?.images?.url}
                          src=""
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{item.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
          <div className="btn">
            {isSeller ? (
              <Link to={"/dashboard/home"}>
                <h1 className="text-[#fff] flex items-center">
                  Go To Dashboard <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            ) : (
              <Link to={"/shop-login"}>
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* ------Bottom-Navbar-------- */}
      <BottomNavbar
        active={active}
        setActive={setActive}
        dropDown={dropDown}
        setDropDown={setDropDown}
        openCart={openCart}
        setOpenWishlist={setOpenWishlist}
        openWishlist={openWishlist}
        setOpenCart={setOpenCart}
      />

      {/* -----Mobile-Menu----- */}
      <MobileHeader
        handleSearchChange={handleSearchChange}
        active={active}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchData={searchData}
        setSearchData={searchData}
        open={open}
        setOpen={setOpen}
        openCart={openCart}
        setOpenCart={setOpenCart}
        setOpenWishlist={setOpenWishlist}
        openWishlist={openWishlist}
      />
    </>
  );
};

export default Navbar;

