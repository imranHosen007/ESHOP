import React, { useEffect, useState } from "react";
import ShopProfileData from "../../Components/Dashboard/ShopDashboard/ShopProfileData";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useDispatch, useSelector } from "react-redux";
import { shopGetProducts } from "../../Redux/Api/ProductApi";

const ShopPreview = () => {
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [seller, setSeller] = useState("");

  useEffect(() => {
    dispatch(shopGetProducts(id));
    axiosPublic
      .get(`/shop/${id}`)
      .then((res) => {
        setSeller(res.data.shop);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

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

  const averageRating = totalRatings / totalReviewsLength || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="section  bg-[#f5f5f5]">
      <div className="flex justify-between w-full py-10">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          {/* ------Shop-Info------ */}
          <div>
            {" "}
            <div className="w-full py-5">
              <div className="flex flex-col items-center justify-center">
                <img
                  src={seller?.avatar?.url}
                  alt=""
                  className="w-[150px] h-[150px] object-cover rounded-full"
                />
              </div>
              <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
              <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
                {seller?.description}
              </p>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Address</h5>
              <h4 className="text-[#000000a6]">{seller?.address}</h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Phone Number</h5>
              <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
            </div>
            <div className="p-3">
              <h5 className="font-[600]">Total Products</h5>
              <h4 className="text-[#000000a6]">{product && product.length}</h4>
            </div>{" "}
            <div className="p-3">
              <h5 className="font-[600]">Shop Rating</h5>
              <h4 className="text-[#000000a6]">{averageRating}/5</h4>
            </div>{" "}
            <div className="p-3">
              <h5 className="font-[600]">Joined On</h5>
              <h4 className="text-[#000000a6]">
                {seller?.createdAt?.slice(0, 10)}
              </h4>
            </div>
          </div>
        </div>
        <div className="md:w-[72%] rounded-[4px] w-[74%]">
          <ShopProfileData />
        </div>
      </div>
    </div>
  );
};

export default ShopPreview;
