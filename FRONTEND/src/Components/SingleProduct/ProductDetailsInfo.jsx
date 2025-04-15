import React, { useEffect, useState } from "react";
import Rating from "../Product/Rating";
import { useDispatch, useSelector } from "react-redux";
import { shopGetProducts } from "../../Redux/Api/ProductApi";
import { Link } from "react-router-dom";

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const totalReviewsLength =
    product &&
    product.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    product &&
    product.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded">
      <div className="flex justify-between pt-10 pb-2 border-b">
        <div className="relative">
          <h5
            onClick={() => setActive(1)}
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            }
          >
            Product Details
          </h5>
          {active == 1 ? (
            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]"></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            onClick={() => setActive(2)}
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            }
          >
            Product Reviews
          </h5>
          {active == 2 ? (
            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]"></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            onClick={() => setActive(3)}
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            }
          >
            Seller Information
          </h5>
          {active == 3 ? (
            <div className="absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]"></div>
          ) : null}
        </div>
      </div>
      {active == 1 ? (
        <div className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
          {" "}
          {data.description}
        </div>
      ) : null}
      {active == 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data && data.reviews.length === 0 && (
            <div className="flex items-center justify-center w-full mt-20 ">
              <h5>No Reviews have for this product!</h5>
            </div>
          )}
          {data &&
            data.reviews.map((item, index) => {
              return (
                <div key={index} className="flex w-full my-2">
                  <img
                    src=""
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    <div className="flex items-center w-full">
                      <h1 className="font-[500] mr-3">{item.user.name}</h1>

                      <Rating rating={data?.ratings} />
                    </div>
                    <p>{item?.comment}</p>
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}
      {active == 3 ? (
        <div className="block w-full p-5 md:flex">
          <div className="w-full md:w-1/2">
            <div className="flex items-center">
              <img
                src={data.shop?.avatar}
                alt=""
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="pl-3">
                <h3 className="pt-3 text-[15px] text-blue-400 pb-2">
                  {data.shop.name}
                </h3>
                <h5 className="text-[15px]"> ({averageRating}/5) Ratings</h5>
              </div>
            </div>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
              cum consectetur labore inventore numquam officia ut praesentium
              beatae, incidunt ratione.
            </p>
          </div>
          {/* ----Right-Side----- */}
          <div className="flex-col w-full mt-5 md:flex md:items-end md:w-1/2 md:mt-0">
            <div className="space-y-2">
              <h5 className="font-semibold">
                Joined on :<span>{data.shop?.createdAt.slice(0, 10)}</span>
              </h5>
              <h5 className="font-semibold">
                Total Product:<span>{product && product.length}</span>
              </h5>
              <h5 className="font-semibold">
                Total Reviews :<span>{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <button className="btn !rounded !h-[40px]">
                  <span className="text-white">Visit Shop</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsInfo;
