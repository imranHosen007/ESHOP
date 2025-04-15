import React, { useState } from "react";
import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AllOrder from "./AllOrder";
import Refund from "./Refund";

import AddAdress from "./AddAdress";
import { toast, ToastContainer } from "react-toastify";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import ChangePassowrd from "./ChangePassowrd";
import { getFetchUser } from "../../../Redux/Api/UserApi";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((store) => store.user);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const [avatar, setAvatar] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axiosPublic
          .put(
            "/user/update-avatar",
            { avatar: reader.result },
            { withCredentials: true }
          )
          .then((res) => {
            alert("avatar updated successfully!");
            dispatch(getFetchUser());
          })
          .catch((error) => toast.error(error.response.data.message));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onSubmitHandle = (data) => {
    const updatedData = {
      name: data.name,
      phone: data.phone,
      password: data.password,
      email: user?.email,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Update Information",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/user`, updatedData, { withCredentials: true })
          .then((res) => {
            if (res.data.success === true) {
              Swal.fire({
                title: "Updated",
                text: "Information Updated SuccesFull!",
                icon: "success",
              });
              resetField("password");
              // window.location.reload(true);
            }
          })
          .catch((error) => {
            return toast.error(error.response.data.message);
          });
      }
    });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      {active == 1 && (
        <div>
          <div className="flex items-center justify-center w-full">
            <div className="relative">
              <img
                src={user.avatar?.url}
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
          </div>{" "}
          <br />
          <br />
          <div className="w-full px-5">
            {user && user.length !== 0 && (
              <form onSubmit={handleSubmit(onSubmitHandle)}>
                {/* 1st-Col */}
                <div className="w-full pb-3 md:flex">
                  <div className="w-full md:w-1/2">
                    <label className="block pb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      defaultValue={user?.name}
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
                      defaultValue={user?.email}
                      type="text"
                      id="email"
                      className="formInput !w-[95%] mb-4 md:mb-0"
                    />
                  </div>
                </div>
                {/* 2nd-Col */}
                <div className="w-full pb-3 md:flex">
                  <div className="w-full md:w-1/2">
                    <label className="block pb-2" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      placeholder="Enter Your Phone Number"
                      {...register("phone")}
                      defaultValue={user?.phone || ``}
                      type="number"
                      id="phone"
                      className="formInput !w-[95%] mb-4 md:mb-0"
                    />
                  </div>{" "}
                  <div className="w-full md:w-1/2">
                    <label className="block pb-2" htmlFor="password">
                      Password
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
                    className="h-[40px] border border-[#3a24db] text-[#3a24db] rounded-[3px] mt-8 cursor-pointer w-[250px] "
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {active == 2 && <AllOrder />}
      {active == 3 && <Refund />}
      {active == 4 && null}

      {active == 5 && <ChangePassowrd />}
      {active == 6 && <AddAdress />}
    </div>
  );
};

export default ProfileContent;
