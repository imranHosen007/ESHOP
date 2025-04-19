import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { shopGetProducts } from "../../../Redux/Api/ProductApi";
const ShopInfo = ({ isOwner }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { seller } = useSelector((store) => store.seller);
  const { product } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    setButtonLoading(true);
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .get(`/shop/logout`, { withCredentials: true })
          .then((res) => {
            if ((res.success = true)) {
              setButtonLoading(false);
              Swal.fire({
                title: res.data.message,
                icon: "success",
              });
              navigate(`/`);
              window.location.reload(true);
            }
          })
          .catch((error) => {
            setButtonLoading(false);
            toast.error(error.response.data.message);
          });
      }
    });
  };
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
  useEffect(() => {
    dispatch(shopGetProducts(id));
  }, []);
  return (
    <div>
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
        <h4 className="text-[#000000a6]">{seller.address}</h4>
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
        <h4 className="text-[#000000a6]">{seller?.createdAt?.slice(0, 10)}</h4>
      </div>
      {isOwner === true && (
        <div className="px-4 py-3">
          <Link to={`/dashboard/settings`}>
            <button className="btn !w-full !h-[42px] !rounded-[5px] text-white">
              Edit Shop
            </button>
          </Link>{" "}
          <button
            disabled={buttonLoading}
            onClick={handleLogout}
            className="btn disabled:cursor-not-allowed !w-full !h-[42px] !rounded-[5px] text-white"
          >
            {buttonLoading ? (
              <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
            ) : (
              " Log Out"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
