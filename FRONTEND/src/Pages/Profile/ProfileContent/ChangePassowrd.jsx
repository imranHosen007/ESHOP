import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
const ChangePassowrd = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisibl1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const axiosPublic = useAxiosPublic();
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    setButtonLoading(true);
    e.preventDefault();
    const passwordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    if (newPassword !== confirmPassword) {
      setButtonLoading(false);
      return setError(`Password doesn't matched with each other!`);
    } else {
      setButtonLoading(false);
      setError("");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "Change Password",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .put(`/user/password-change`, passwordData, { withCredentials: true })
          .then((res) => {
            if (res.data.success === true) {
              setButtonLoading(false);
              Swal.fire({
                title: "SuccesFull",
                text: res?.data?.message,
                icon: "success",
              });
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
              // window.location.reload(true);
            }
          })
          .catch((error) => {
            setButtonLoading(false);
            return toast.error(error.response.data.message);
          });
      }
    });
  };
  return (
    <div className="w-full p-5 mx-6 bg-white rounded-md shadow-lg md:w-1/2 md:mx-auto">
      <ToastContainer />
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="">
        {" "}
        <form
          className="flex flex-col items-center"
          onSubmit={handlePasswordChange}
          aria-required
        >
          <div className="w-full mt-5 ">
            {" "}
            <label className="block pb-2 " htmlFor="oldpassword">
              Enter Your Old Password
            </label>
            <div className="relative">
              {" "}
              <input
                type={visible ? "text" : "password"}
                id="oldpassword"
                required
                placeholder="Enter Your Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="!w-[95%] mb-4 md:mb-0 formInput "
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
          </div>{" "}
          <div className="w-full mt-5 ">
            {" "}
            <label className="block pb-2 " htmlFor="newpassword">
              Enter Your New Password
            </label>
            <div className="relative">
              {" "}
              <input
                type={visible1 ? "text" : "password"}
                id="newpassword"
                required
                placeholder="Enter Your New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="!w-[95%] mb-4 md:mb-0 formInput"
              />{" "}
              {visible1 ? (
                <AiOutlineEye
                  onClick={() => setVisibl1(!visible1)}
                  className="absolute cursor-pointer right-8 top-2"
                  size={25}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setVisibl1(!visible1)}
                  className="absolute cursor-pointer right-8 top-2"
                  size={25}
                />
              )}
            </div>
          </div>{" "}
          <div className="w-full mt-5 ">
            <label className="block pb-2 " htmlFor="confirmpassword">
              Enter Your Confirm Password
            </label>
            <div className="relative">
              {" "}
              <input
                type={visible2 ? "text" : "password"}
                required
                id="confirmpassword"
                placeholder="Enter Your Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="!w-[95%] mb-4 md:mb-0 formInput"
              />
              {visible2 ? (
                <AiOutlineEye
                  onClick={() => setVisible2(!visible2)}
                  className="absolute cursor-pointer right-8 top-2"
                  size={25}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setVisible2(!visible2)}
                  className="absolute cursor-pointer right-8 top-2"
                  size={25}
                />
              )}
            </div>
          </div>
          {error && (
            <p className="pt-2 text-xl text-red-500">{error && error} </p>
          )}
          <button
            disabled={buttonLoading}
            type="submit"
            className={`w-[95%] disabled:cursor-not-allowed h-[40px] border hover:bg-transparent hover:border-[#3a24db] text-center hover:text-[#3a24db] rounded-[3px] mt-8 cursor-pointer bg-[#3a24db] text-white duration-200`}
          >
            {buttonLoading ? (
              <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600" />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassowrd;
