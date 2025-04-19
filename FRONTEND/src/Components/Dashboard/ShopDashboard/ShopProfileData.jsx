import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { shopGetProducts } from "../../../Redux/Api/ProductApi";
import { getShopEvent } from "../../../Redux/Api/EventApi";

const ShopProfileData = ({ isOwner }) => {
  const { product } = useSelector((store) => store.product);
  const { seller } = useSelector((store) => store.seller);
  const { event, isLoading } = useSelector((store) => store.event);
  const dispatch = useDispatch();
  const [active, setActive] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    dispatch(shopGetProducts(id));
    dispatch(getShopEvent(seller._id));
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`${
                active === 1 ? "text-red-500" : "text-[#333]"
              } font-[600] text-[20px] cursor-pointer pr-[20px]`}
            >
              {" "}
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`${
                active === 2 ? "text-red-500" : "text-[#333]"
              } font-[600] text-[20px] cursor-pointer pr-[20px]`}
            >
              {" "}
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`${
                active === 3 ? "text-red-500" : "text-[#333]"
              } font-[600] text-[20px] cursor-pointer pr-[20px]`}
            >
              {" "}
              Shop Reviews
            </h5>
          </div>
        </div>
        {isOwner === true && (
          <Link to={`/dashboard/home`}>
            <button className="btn !rounded-[4px] h-[42px] text-white">
              Go Dashboard
            </button>
          </Link>
        )}
      </div>
      <br />
      {active === 1 && (
        <div>
          {" "}
          {product.length === 0 && (
            <h4 className="flex w-full text-2xl font-bold">
              {" "}
              No Product have for this shop!
            </h4>
          )}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px]  mb-12 border-0">
            {product &&
              product.map((item, index) => {
                return <ProductCard key={index} isAdmin={true} item={item} />;
              })}
          </div>
        </div>
      )}{" "}
      {active === 2 && (
        <div>
          {event.length === 0 && (
            <h4 className="flex w-full text-2xl font-bold">
              No Events have for this shop!
            </h4>
          )}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px]  mb-12 border-0">
            {event &&
              event.map((item, index) => {
                return <ProductCard key={index} isAdmin={true} item={item} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
