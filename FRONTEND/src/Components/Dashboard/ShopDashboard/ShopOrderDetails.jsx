import React, { useEffect, useState } from "react";
import { getOrderByShop } from "../../../Redux/Api/OrderApi";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./DashboardHeader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsFillBagFill } from "react-icons/bs";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
const ShopOrderDetails = () => {
  const { seller } = useSelector((store) => store.seller);
  const { allOrder } = useSelector((store) => store.order);
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [statusLoading, setStatusLoading] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
  // ----Update-Status-----
  const handleUpdateStatus = () => {
    setStatusLoading(true);
    if (data?.status === status) {
      setStatusLoading(false);
      return toast.error(`Already ${data?.status}`);
    }
    axiosPublic
      .put(`/order/status/${id}`, { status }, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStatusLoading(false);
          // alert("Order updated!");
          Swal.fire({
            title: "SuccesFull!",
            text: "Order updated!",
            icon: "success",
          });

          navigate("/dashboard/order");
        }
      })
      .catch((error) => {
        setStatusLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };

  // -----handleRefeund------
  const handleRefeund = () => {
    setRefundLoading(true);
    axiosPublic
      .put(`/order/refund-success/${id}`, { status }, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setRefundLoading(false);
          Swal.fire({
            title: "SuccesFull!",
            text: res?.data?.message,
            icon: "success",
          });

          navigate("/dashboard/order");
        }
      })
      .catch((error) => {
        setRefundLoading(false);
        toast.error(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    dispatch(getOrderByShop(seller._id));
    const findData = allOrder.find((item) => item._id === id);
    setData(findData);
  }, []);

  return (
    <div>
      <DashboardHeader />
      <div className="min-h-screen py-4 section">
        <ToastContainer />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BsFillBagFill size={30} color="crimson" />
            <h1 className="pl-2 text-[25px]">Order Details</h1>
          </div>
          <Link to={`/dashboard/order`}>
            <button className=" !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px] btn">
              Order List
            </button>
          </Link>
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
            </div>
          ))}
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
              Status:{" "}
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : "Not Paid"}
            </h4>
          </div>
        </div>
        <br />
        <br />
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
        {data?.status !== "Processing refund" &&
          data?.status !== "Refund Success" && (
            <select
              className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {[
                "Processing",
                "Transferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ]
                .slice(
                  [
                    "Processing",
                    "Transferred to delivery partner",
                    "Shipping",
                    "Received",
                    "On the way",
                    "Delivered",
                  ].indexOf(data?.status)
                )
                .map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
            </select>
          )}
        {data?.status === "Processing refund" ||
        data?.status === "Refund Success" ? (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        ) : null}

        <button
          disabled={refundLoading || statusLoading}
          onClick={
            data?.status !== ' "Processing refund"'
              ? handleUpdateStatus
              : handleRefeund
          }
          className="btn  mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px] disabled:!bg-slate-500 disabled:text-white"
        >
          {refundLoading || statusLoading ? (
            <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-600" />
          ) : (
            "Update Status"
          )}
        </button>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
