import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getFetchSeller } from "../../../Redux/Api/SellerApi";
const Settings = () => {
  const { seller } = useSelector(store => store.seller);
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ---Handle-Image-Change--
  const handleImageChange = e => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axiosPublic
          .put(
            "/shop/updated-avatar",
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then(res => {
            if (res.data.success) {
              alert("avatar updated successfully!");
              dispatch(getFetchSeller());
            }
          })
          .catch(error => toast.error(error.response.data.message));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onSubmitHandle = data => {
    const updatedData = {
      name: data.name,
      password: data.password,
      address: data.address,
      phoneNumber: data.phoneNumber,
      zipCode: data.zipCode,
    };
    axiosPublic
      .put(`/shop/updated-information`, updatedData, { withCredentials: true })
      .then(res => {
        if (res.data.success) {
          Swal.fire({
            title: "SuccesFull",
            text: "Shop info updated succesfully!",
            icon: "success",
          });
          dispatch(getFetchSeller());
          navigate("/dashboard/home");
        }
      })
      .catch(error =>
        toast.error(error.response.data.message, { position: "top-center" })
      );
  };
  return (
    <div className="pt-10">
      <ToastContainer />
      <div className="flex items-center justify-center w-full pb-10">
        <div className="relative">
          <img
            src={seller.avatar?.url}
            alt=""
            className="w-[150px] h-[150px] rounded-full  object-cover border-[3px] border-[#3ad132] "
          />
          <div className="w-[35px] h-[35px] bg-[#E3E9EE] rounded-full absolute bottom-[5px] right-[5px] cursor-pointer flex items-center justify-center">
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label htmlFor="image">
              <AiOutlineCamera size={20} />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full px-5">
        {seller && seller.length !== 0 && (
          <form
            onSubmit={handleSubmit(onSubmitHandle)}
            aria-aria-required={true}
          >
            {/* 1st-Col */}
            <div className="w-full pb-3 md:flex">
              <div className="w-full md:w-1/2">
                <label className="block pb-2" htmlFor="name">
                  Shop Name
                </label>
                <input
                  {...register("name")}
                  defaultValue={seller?.name}
                  type="text"
                  id="name"
                  className="formInput !w-[95%] mb-4 md:mb-0"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block pb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  disabled
                  readOnly
                  defaultValue={seller?.email}
                  type="text"
                  id="email"
                  className="formInput !w-[95%] mb-4 md:mb-0"
                />
              </div>
            </div>
            {/* 2nd-col */}
            <div className="w-full pb-3 md:flex">
              <div className="w-full md:w-1/2">
                <label className="block pb-2" htmlFor="shopaddress">
                  shop Address
                </label>
                <input
                  {...register("address")}
                  defaultValue={
                    seller?.address
                      ? seller?.address
                      : "Enter your shop address"
                  }
                  type="text"
                  id="shopaddress"
                  className="formInput !w-[95%] mb-4 md:mb-0"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="block pb-2" htmlFor="phone">
                  Shop Phone Number
                </label>
                <input
                  placeholder="Enter Your Phone Number"
                  {...register("phoneNumber")}
                  defaultValue={
                    seller?.phoneNumber || `Enter Your Shop Phone Number`
                  }
                  type="number"
                  id="phone"
                  className="formInput !w-[95%] mb-4 md:mb-0"
                />
              </div>
            </div>
            {/* 3nd-Col */}
            <div className="w-full pb-3 md:flex">
              <div className="w-full md:w-1/2">
                <label className="block pb-2" htmlFor="zipcode">
                  ZipCode
                </label>
                <input
                  {...register("zipCode")}
                  defaultValue={seller?.zipCode || `Enter Your Shop zipCode`}
                  type="number"
                  id="zipcode"
                  className="formInput !w-[95%] mb-4 md:mb-0"
                />
              </div>{" "}
              <div className="w-full md:w-1/2">
                <label className="block pb-2" htmlFor="password">
                  Shop Password
                </label>
                <div className="relative ">
                  {" "}
                  <input
                    placeholder="Enter Your Password"
                    {...register("password")}
                    type={visible ? "text" : "password"}
                    id="password"
                    className="formInput !w-[95%] mb-4 md:mb-0"
                  />
                  {visible ? (
                    <AiOutlineEye
                      onClick={() => setVisible(!visible)}
                      className="absolute cursor-pointer right-8 top-2"
                      size={25}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setVisible(!visible)}
                      className="absolute cursor-pointer right-8 top-2"
                      size={25}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              {" "}
              <button
                type="submit"
                className="h-[40px] border hover:border-[#3a24db] hover:text-[#3a24db] rounded-[3px] mt-8 cursor-pointer bg-[#3a24db] text-white hover:bg-transparent duration-200 w-[250px] "
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
