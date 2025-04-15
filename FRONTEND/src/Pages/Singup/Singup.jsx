import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Form, Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const Singup = () => {
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
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

  const handleSubmit = e => {
    e.preventDefault();

    axiosPublic
      .post(
        `user/create-user`,
        { name, password, email, avatar },
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
            title: "Registion SuccesFull!",
            showConfirmButton: false,
            timer: 1500,
          });
          setName("");
          setEmail("");
          setPassword("");
          setAvatar("");
          navigate(`/`);
          window.location.reload(true);
        }
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="w-full sm:mx-auto sm:max-w-md">
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          {" "}
          Register As A New User
        </h2>
      </div>
      <div className="w-full mt-8 sm:mx-auto sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={visible ? "text" : "password"}
                  id="Password"
                  name="pasword"
                  autoComplete="Password"
                  required
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className="flex items-center w-full">
              <h4>Already have an account?</h4>
              <Link to="/login" className="pl-2 text-blue-600">
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

export default Singup;
