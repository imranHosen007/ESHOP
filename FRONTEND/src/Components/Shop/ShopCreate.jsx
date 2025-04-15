import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
const ShopCreate = () => {
  const axiosPublic = useAxiosPublic();
  const [avatar, setAvatar] = useState();
  const { register, handleSubmit, reset } = useForm();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const handleFileInput = e => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmitHandle = data => {
    const sellerData = {
      avatar: avatar,
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      phoneNumber: data.phone,
      zipCode: data.zipcode,
    };
    axiosPublic
      .post(
        `/shop`,
        sellerData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(res => {
        if (res.data.success == true) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Shop Created SuccesFull!",
            showConfirmButton: false,
            timer: 1500,
          });
          alert(`Shop Created SuccesFull!`);
          navigate(`/`);
          reset();
        }

        window.location.reload(true);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full sm:mx-auto sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmitHandle)} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  id="name"
                  name="name"
                  required
                  {...register("name")}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  {...register("phone")}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  {...register("email")}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  id="address"
                  required
                  {...register("address")}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="zipcode"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  id="zipcode"
                  required
                  {...register("zipcode")}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>{" "}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  {...register("password")}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    onClick={() => setVisible(!visible)}
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setVisible(!visible)}
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="flex items-center mt-2">
                <span className="inline-block w-8 h-8 overflow-hidden rounded-full">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt=""
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <RxAvatar className="w-8 h-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleFileInput}
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className="flex items-center w-full">
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="pl-2 text-blue-600">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShopCreate;
