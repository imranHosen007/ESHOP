import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import axios from "axios";
export const Checkout = () => {
  const { user } = useSelector(store => store.user);
  const { cart } = useSelector(store => store.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState();
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // --------Calculation-----
  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shipping = subTotalPrice * 0.1;
  const discountPercentenge = couponCodeData ? discountPrice : 0;

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);
  // ----Payment-Handle---
  const paymentSubmit = () => {
    if (
      address1 === "" ||
      address2 === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      return toast.error("Please choose your delivery address!");
    }
    const shippingAddress = {
      address1,
      address2,
      zipCode,
      country,
      city,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    navigate("/payment", { state: orderData });
  };

  // ----Coupon-Code-----
  const handleCouponCode = e => {
    e.preventDefault();
    const name = couponCode;

    axiosPublic
      .get(`/coupon/coupon-value/${name}`)
      .then(res => {
        const shopId = res.data.couponCode?.shopId;
        const couponCodeValue = res.data.couponCode?.value;

        if (res?.data?.success) {
          const isCouponValid =
            cart &&
            cart.filter(item => {
              return item.shopId === shopId;
            });

          if (isCouponValid.length === 0) {
            toast.error("Coupon code is not valid for this shop");
            setCouponCode("");
          } else {
            const eligiblePrice = isCouponValid.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            );
            const discountPrice = (eligiblePrice * couponCodeValue) / 100;

            setDiscountPrice(discountPrice);
            setCouponCodeData(res?.data?.couponCode);
            setCouponCode("");
          }
        }
      })
      .catch(error => toast.error(error?.response?.data?.message));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center w-full py-8">
      <ToastContainer />
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <div className="w-full md:w-[95%] bg-white rounded-md p-5 pb-8">
            <h5 className="text-[18px] font-[500] pb-3">Shipping Address</h5>
            <form>
              {/* ----1st-col---- */}
              <div className="w-full pb-3 sm:flex">
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    readOnly
                    disabled
                    required
                    placeholder="Enter Your Name"
                    value={user && user?.name}
                    className="formInput !w-[95%]"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    readOnly
                    disabled
                    placeholder="Enter Your Email Address"
                    defaultValue={user && user?.email}
                    className="formInput"
                  />
                </div>
              </div>
              {/* ----2nd-col---- */}
              <div className="w-full pb-3 sm:flex">
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    required
                    placeholder="Enter Your Number"
                    value={user?.phone}
                    className="formInput !w-[95%]"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="zipCode">
                    Zip Code
                  </label>
                  <input
                    type="number"
                    id="zipCode"
                    name="zipCode"
                    required
                    placeholder="Enter Your Zip Code"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    className="formInput "
                  />
                </div>
              </div>
              {/* ----3rd-Col----- */}
              <div className="w-full pb-3 sm:flex">
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="country">
                    Country
                  </label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    id="country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  >
                    <option className="block pb-2" defaultChecked>
                      Choose your country
                    </option>{" "}
                    {Country.getAllCountries().map(item => {
                      return (
                        <option
                          value={item.isoCode}
                          className="block pb-2"
                          key={item.isoCode}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="city">
                    City
                  </label>
                  <select
                    className="w-[95%] border h-[40px] rounded-[5px]"
                    id="city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  >
                    <option className="block pb-2" defaultChecked>
                      Choose your country
                    </option>{" "}
                    {State.getStatesOfCountry(country).map(item => {
                      return (
                        <option
                          value={item.isoCode}
                          key={item.isoCode}
                          className="block pb-2"
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>{" "}
              {/* ----4th-col---- */}
              <div className="w-full pb-3 sm:flex">
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="address1">
                    Address1
                  </label>
                  <input
                    type="text"
                    id="address1"
                    name="address1"
                    required
                    placeholder="Enter Your address1"
                    value={address1}
                    onChange={e => setAddress1(e.target.value)}
                    className="formInput !w-[95%]"
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label className="block pb-2" htmlFor="address2">
                    Address2
                  </label>
                  <input
                    type="text"
                    id="address2"
                    name="address2"
                    required
                    placeholder="Enter Your address2"
                    value={address2}
                    onChange={e => setAddress2(e.target.value)}
                    className="formInput "
                  />
                </div>
              </div>
            </form>
            <h5
              className="text-[18px] cursor-pointer inline-block"
              onClick={() => setUserInfo(!userInfo)}
            >
              Choose From saved address
            </h5>

            {userInfo && (
              <div>
                {user &&
                  user?.addresses?.map((item, index) => {
                    return (
                      <div key={index} className="flex w-full mt-1">
                        <input
                          onClick={() =>
                            setAddress1(item.address1) ||
                            setAddress2(item.address2) ||
                            setZipCode(item.zipCode) ||
                            setCountry(item.country) ||
                            setCity(item.city)
                          }
                          name="addressType"
                          id={item?.addressType}
                          type="radio"
                          className="mr-3"
                          value={item?.addressType}
                        />
                        <label htmlFor={item?.addressType}>
                          {item?.addressType}
                        </label>
                      </div>
                    );
                  })}
                {user && user.addresses?.length === 0 && (
                  <h5 className="mt-4 text-blue-400">Saved Address Empty</h5>
                )}
              </div>
            )}
          </div>
        </div>
        {/* -----Shopping-data------ */}
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
          <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                subtotal:
              </h3>
              <h5 className="text-[18px] font-[600]">
                ${subTotalPrice.toFixed(2)}
              </h5>
            </div>
            <br />{" "}
            <div className="flex justify-between">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                shipping:
              </h3>
              <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
            </div>
            <br />
            <div className="flex justify-between pb-3 border-b">
              <h3 className="text-[16px] font-[400] text-[#000000a4]">
                Discount:
              </h3>
              <h5 className="text-[18px] font-[600]">
                -${discountPercentenge.toFixed(2)}
              </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
              ${totalPrice}
            </h5>
            <form onSubmit={handleCouponCode}>
              <input
                type="text"
                className=" h-[40px] pl-2 formInput"
                placeholder="Coupoun code"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                required
              />

              <button
                className="w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer"
                type="submit"
              >
                Apply code
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* -----Button---- */}
      <button
        className="w-[150px] md:w-[280px] mt-10 btn"
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </button>
    </div>
  );
};
