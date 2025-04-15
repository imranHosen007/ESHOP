import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { getFetchSeller } from "../../../Redux/Api/SellerApi";
const WithDrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector(store => store.seller);
  const { register, handleSubmit, reset } = useForm();
  const [paymentMethod, setPaymentMethod] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [withdrawAmount, setWithdrawAmount] = useState(50);

  const availableBalance = seller?.availableBalance.toFixed(2);
  const error = () => {
    toast.error("You not have enough balance to withdraw!");
  };
  // handle-Submit-From
  const onsubmitHandle = data => {
    const withdrawMethod = {
      bankName: data.bankName,
      bankCountry: data.bankCountry,
      bankSwiftCode: data.bankSwiftCode,
      bankAccountNumber: data.bankAccountNumber,
      bankHolderName: data.bankHolderName,
      bankAddress: data.bankAddress,
    };
    axiosPublic
      .put(`/shop/updated-payment-method`, withdrawMethod, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.success) {
          alert("Withdraw method added successfully!");
          setPaymentMethod(false);
          reset();
          dispatch(getFetchSeller());
        }
      })
      .catch(error => toast.error(error.response.data.message));
  };
  // ---HandleDelte--
  const handleDelte = () => {
    axiosPublic
      .delete(`/shop/delete/payment-method`, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.success) {
          alert("Withdraw method Delete successfully!");

          dispatch(getFetchSeller());
        }
      })
      .catch(error => toast.error(error.response.data.message));
  };

  // ---Handle-Withdraw---
  const withdrawHandler = () => {
    if (withdrawAmount < 50 || Number(withdrawAmount) > availableBalance) {
      toast.error("You can't withdraw this amount!");
    } else {
      axiosPublic
        .post(
          "/withdraw",
          { amount: withdrawAmount, seller: seller },
          { withCredentials: true }
        )
        .then(res => {
          if (res.data.success) {
            alert("Withdraw Money Requestsuccessfully!");

            dispatch(getFetchSeller());
          }
        })
        .catch(error => toast.error(error.response.data.message));
    }
  };

  return (
    <div>
      <div className="w-full h-[90vh] p-8">
        <ToastContainer />
        <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
          <h5 className="text-[20px] pb-4">
            Available Balance: ${availableBalance}
          </h5>
          <button
            onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
            className="btn  text-white !h-[42px] !rounded"
          >
            Withdraw
          </button>
        </div>
        {open && (
          <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
            <div
              className={`w-[95%] md:w-[50%] bg-white shadow rounded   min-h-[40vh] p-3`}
            >
              {" "}
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  onClick={() => setOpen(false) || setPaymentMethod(false)}
                  className="cursor-pointer"
                />
              </div>
              {paymentMethod ? (
                <div>
                  <h3 className="text-[22px] font-Poppins text-center font-[600]">
                    Add new Withdraw Method:
                  </h3>
                  <form onSubmit={handleSubmit(onsubmitHandle)}>
                    <div>
                      <label htmlFor="bankname">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("bankName")}
                        required
                        id="bankname"
                        placeholder="Enter your Bank name!"
                        className={`formInput mt-2`}
                      />
                    </div>{" "}
                    <div className="pt-2">
                      <label htmlFor="bankocuntry">
                        Bank Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("bankCountry")}
                        required
                        id="bankcountry"
                        placeholder="Enter your Bank Country!"
                        className={`formInput mt-2`}
                      />
                    </div>{" "}
                    <div className="pt-2">
                      <label htmlFor="bankswift">
                        Bank Swift Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register("bankSwiftCode")}
                        required
                        id="bankswift"
                        placeholder="Enter your Bank Swift Code!"
                        className={`formInput mt-2`}
                      />
                    </div>{" "}
                    <div className="pt-2">
                      <label htmlFor="banknumber">
                        Bank Account Number{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        {...register("bankAccountNumber")}
                        required
                        id="banknumber"
                        placeholder="Enter your Bank Account Number!"
                        className={`formInput mt-2`}
                      />
                    </div>{" "}
                    <div>
                      <label htmlFor="bankholdername">
                        Bank Holder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("bankHolderName")}
                        required
                        id="bankholdername"
                        placeholder="Enter your Bank Holder name!"
                        className={`formInput mt-2`}
                      />
                    </div>{" "}
                    <div>
                      <label htmlFor="bankadd">
                        Bank Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register("bankAddress")}
                        required
                        id="bankadd"
                        placeholder="Enter your Bank Address!"
                        className={`formInput mt-2`}
                      />
                    </div>{" "}
                    <button type="submit" className=" mb-3 text-white btn">
                      Add
                    </button>
                  </form>{" "}
                </div>
              ) : (
                <div>
                  <h3 className="text-[22px] font-Poppins">
                    Available Withdraw Methods:
                  </h3>
                  {seller && seller?.withdrawMethod ? (
                    <div>
                      <div className="md:flex w-full justify-between items-center">
                        <div className="md:w-[50%]">
                          <h5>
                            Account Number:
                            {"*".repeat(
                              seller?.withdrawMethod.bankAccountNumber.length -
                                3
                            ) +
                              seller?.withdrawMethod.bankAccountNumber.slice(
                                -3
                              )}
                          </h5>
                          <h5>Bank Name: {seller?.withdrawMethod.bankName}</h5>
                        </div>
                        <div className="md:w-[50%]">
                          <AiOutlineDelete
                            onClick={handleDelte}
                            size={25}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <br />
                      <h4>Available Balance: ${availableBalance}</h4>
                      <br />
                      <div className="md:flex w-full items-center">
                        <input
                          type="number"
                          placeholder="Amount..."
                          value={withdrawAmount}
                          onChange={e => setWithdrawAmount(e.target.value)}
                          className="md:w-[100px] w-[full] border md:mr-3 p-1 rounded"
                        />
                        <button
                          className={`btn !h-[42px] text-white`}
                          onClick={withdrawHandler}
                        >
                          Withdraw
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[18px] pt-2">
                        No Withdraw Methods available!
                      </p>
                      <button
                        onClick={() => setPaymentMethod(true)}
                        className="text-[#fff] text-[18px] mt-4 btn"
                      >
                        Add New
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithDrawMoney;
