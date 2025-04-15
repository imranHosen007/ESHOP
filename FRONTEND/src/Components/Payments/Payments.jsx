import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
const Payments = () => {
  const axiosPublic = useAxiosPublic();
  const [open, setOpen] = useState(false);
  const [buttoClick, setButtonClick] = useState(false);
  const { user } = useSelector(state => state.user);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const element = useElements();
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  const data = useLocation();
  // ----Order-Data-----
  const order = {
    cart: data?.state.cart,
    shippingAddress: data?.state.shippingAddress,
    user: user && user,
    totalPrice: data?.state.totalPrice,
  };

  const createOrder = (data, actions) => {};
  const onApprove = () => {};
  // ----PaymentHandler------
  const paymentHandler = async e => {
    e.preventDefault();
    setButtonClick(true);

    if (!element || !stripe) {
      setButtonClick(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: element.getElement(CardNumberElement),
      },
    });

    if (result?.error) {
      setButtonClick(false);
      toast.error(result.error.message);
    }

    if (result?.paymentIntent?.status === "succeeded") {
      order.paymentInfo = {
        id: result.paymentIntent.id,
        status: result?.paymentIntent?.status,
        type: "Credit Card",
      };

      axiosPublic
        .post(`/order`, order, { withCredentials: true })
        .then(res => {
          if (res?.data?.success) {
            navigate("/order-success");
          }
        })
        .catch(error =>
          toast.error("Order Failed", error?.response?.data?.message)
        );
    }
  };

  // ----Paypal-Handler-----
  const paypalPaymentHandler = () => {};
  // ----CashOnDelivery-----
  const handleCashOnDelivery = e => {
    e.preventDefault();
    order.paymentInfo = {
      type: "Cash On Delivery",
    };
    axiosPublic
      .post(`/order`, order, { withCredentials: true })
      .then(res => {
        if (res?.data?.success) {
          navigate("/order-success");
        }
      })
      .catch(error =>
        toast.error("Order Failed", error?.response?.data?.message)
      );
  };

  const paymentData = {
    price: Number(Math.round(data?.state.totalPrice * 100)),
  };

  useEffect(() => {
    axiosPublic
      .post(
        "/payment/procces",
        paymentData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(res => {
        setClientSecret(res.data.client_secret);
      })
      .catch(error => toast.error(error?.response?.data?.message));
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center w-full py-8">
      <ToastContainer />
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <div className="w-full md:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* -----Select-Button----- */}
            <div>
              <div className="flex w-full pb-5 mb-2 border-b">
                <div
                  className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
                  onClick={() => setSelect(1)}
                >
                  {select == 1 ? (
                    <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full"></div>
                  ) : null}
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                  Pay with Debit/credit card
                </h4>
              </div>
              {select == 1 && (
                <div>
                  <form onSubmit={paymentHandler}>
                    <div className="flex w-full pb-3">
                      <div className="w-full sm:w-1/2">
                        <label className="block pb-2" htmlFor="cardname">
                          Name On Card
                        </label>
                        <input
                          placeholder={user && user.name}
                          id="cardname"
                          name="cardname"
                          type="text"
                          required
                          className="formInput  !w-[95%] text-[#444]"
                          value={user && user.name}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="block pb-2" htmlFor="endData">
                          Exp Data
                        </label>
                        <CardExpiryElement
                          id="endData"
                          className="formInput"
                          options={{
                            style: {
                              base: {
                                fontSize: "19px",
                                lineHeight: 1.5,
                                color: "#444",
                              },
                              empty: {
                                color: "#3a120a",
                                backgroundColor: "transparent",
                                "::placeholder": {
                                  color: "#444",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex w-full pb-3">
                      <div className="w-full sm:w-1/2">
                        <label className="block pb-2" htmlFor="cardnumber">
                          Card Number
                        </label>
                        <CardNumberElement
                          id="cardnumber"
                          className="formInput !h-[35px] !w-[95%]"
                          options={{
                            style: {
                              base: {
                                fontSize: "19px",
                                lineHeight: 1.5,
                                color: "#444",
                              },
                              empty: {
                                color: "#3a120a",
                                backgroundColor: "transparent",
                                "::placeholder": {
                                  color: "#444",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label className="block pb-2">CVV</label>
                        <CardCvcElement
                          className="formInput !h-[35px] "
                          options={{
                            style: {
                              base: {
                                fontSize: "19px",
                                lineHeight: 1.5,
                                color: "#444",
                              },
                              empty: {
                                color: "#3a120a",
                                backgroundColor: "transparent",
                                "::placeholder": {
                                  color: "#444",
                                },
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <button
                      disabled={buttoClick}
                      type="submit"
                      className="btn !bg-[#f63b60] disabled:!bg-slate-500 text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* ----Paypal-Payment------ */}
            <div className="py-3">
              <div className="flex w-full pb-5 mb-2 border-b">
                <div
                  className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
                  onClick={() => setSelect(2)}
                >
                  {select == 2 ? (
                    <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full"></div>
                  ) : null}
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                  Pay with PayPal
                </h4>
              </div>
              {select == 2 ? <div>for</div> : null}
            </div>
            {/* ----Cash on -Payment------ */}
            <div className="py-3">
              <div className="flex w-full pb-5 mb-2 border-b">
                <div
                  className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center cursor-pointer"
                  onClick={() => setSelect(3)}
                >
                  {select == 3 ? (
                    <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full"></div>
                  ) : null}
                </div>
                <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                  Cash on Delivery
                </h4>
              </div>
              {select == 3 ? (
                <div className="flex w-full">
                  <form className="w-full" onSubmit={handleCashOnDelivery}>
                    <button
                      type="submit"
                      className="btn !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]"
                    >
                      Confirm
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {/* -------Cart-Data-------- */}
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                subtotal:
              </h3>
              <h5 className="text-[18px] font-[600]">
                ${data?.state?.subTotalPrice.toFixed(2)}
              </h5>
            </div>
            <br />{" "}
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                shipping:
              </h3>
              <h5 className="text-[18px] font-[600]">
                ${data?.state?.shipping.toFixed(2)}
              </h5>
            </div>
            <br />
            <div className="flex justify-between pb-3 border-b">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                Discount:
              </h3>

              <h5 className="text-[18px] font-[600]">
                -${data?.state?.discountPrice ? data?.state?.discountPrice : 0}
              </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
              ${data?.state?.totalPrice}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
