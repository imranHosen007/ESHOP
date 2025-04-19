import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserOrder } from "../../../Redux/Api/OrderApi";
import { BsFillBagFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
const UserOrderDetails = () => {
  const { user } = useSelector((store) => store.user);
  const { order } = useSelector((store) => store.order);
  const { id } = useParams();
  const [reviewLoading, setReviewLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const axiosPublic = useAxiosPublic();
  // -HandleReview-

  const handleReview = () => {
    setReviewLoading(true);
    const reviewData = {
      user,
      rating,
      comment,
      productId: selectedItem?.productId,
      orderId: id,
    };

    axiosPublic
      .post("/product/review", reviewData, { withCredentials: true })
      .then((res) => {
        if (res?.data?.success) {
          setReviewLoading(false);
          toast.success(res.data.message);
          setComment("");
          setRating(1);
          setOpen(false);
        }
      })
      .catch((error) => {
        setReviewLoading(false);
        toast.error(error.response.data.message);
      });
  };
  // -Handle-Refund----
  const handleRefund = () => {
    setRefundLoading(true);
    axiosPublic
      .put(
        `/order/refund/${id}`,
        { status: "Processing refund" },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          setRefundLoading(false);
          toast.success(res.data.message);
          dispatch(getUserOrder(user._id));
        }
      })
      .catch((error) => {
        setRefundLoading(true);
        toast.error(error.response.data.message);
      });
  };
  useEffect(() => {
    dispatch(getUserOrder(user._id));
    const findData = order.find((item) => item._id === id);
    setData(findData);
  }, [dispatch]);

  return (
    <div className="min-h-screen py-4 section">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>
      <div className="flex items-center justify-between w-full pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {data &&
        data?.cart.map((item, index) => (
          <div className="flex items-start w-full mb-5">
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <br />
            <br />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US$ {item.price} x {item.quantity}
              </h5>
            </div>
            {data?.status === "Delivered" && (
              <button
                onClick={(e) => setOpen(!open) || setSelectedItem(item)}
                className="btn text-white"
              >
                Write a review
              </button>
            )}
          </div>
        ))}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>{" "}
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                // src={`${selectedItem?.images[0]?.url}`}
                src=""
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  US${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>
            <br />
            <br />
            {/* -----Rating----- */}{" "}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex items-center ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((item, index) => {
                return (
                  <div
                    className="mr-1 cursor-pointer"
                    key={index}
                    onClick={() => setRating(item)}
                    onMouseMove={() => setRating(item)}
                    onMouseLeave={() => setRating(item)}
                  >
                    {item <= rating ? (
                      <AiFillStar color="rgb(246,186,0)" size={25} />
                    ) : (
                      <AiOutlineStar color="rgb(246,186,0)" size={25} />
                    )}
                  </div>
                );
              })}
            </div>
            {/* ---Comment-- */}
            <br />
            <div className="w-full ml-3">
              <label htmlFor="com" className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                value={comment}
                cols="20"
                rows="5"
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
                onChange={(e) => setComment(e.target.value)}
                id="com"
              ></textarea>
            </div>
            <button
              disabled={reviewLoading}
              onClick={handleReview}
              className="btn !disabled:cursor-not-allowed   text-white text-[20px] ml-3"
            >
              {reviewLoading ? (
                <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      )}
      <div className="w-full text-right border-t">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <div className="items-center w-full md:flex">
        <div className="w-full md:w-[60%]">
          {" "}
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress?.address1 +
              " " +
              data?.shippingAddress?.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress?.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress?.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full md:w-[40%]">
          {" "}
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
          {data?.paymentInfo?.status === "Succeeded" ||
            (data?.paymentInfo?.status === "succeeded" && (
              <button
                disabled={refundLoading}
                onClick={handleRefund}
                className="btn !disabled:cursor-not-allowed text-white"
              >
                {refundLoading ? (
                  <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
                ) : (
                  "Give Refund"
                )}
              </button>
            ))}
        </div>
      </div>
      <br />
      <br />
      <button className="btn text-white">Send Message</button>
    </div>
  );
};

export default UserOrderDetails;
