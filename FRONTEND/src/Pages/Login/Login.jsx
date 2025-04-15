import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
const Login = () => {
  const { isLoading, isAtuhenticated } = useSelector(store => store.user);
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    axiosPublic
      .post(`/user/login`, { email, password }, { withCredentials: true })
      .then(res => {
        if (res.data.success === true) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login SuccesFull!",
            showConfirmButton: false,
            timer: 1500,
          });
          setEmail("");
          setPassword("");
        }

        window.location.reload(true);
        navigate("/");
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
          Login to your account
        </h2>
      </div>
      <div className="w-full mt-8 sm:mx-auto sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  name="email"
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
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={visible ? "text" : "password"}
                  id="Password"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {" "}
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
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
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="pl-2 text-blue-600">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
