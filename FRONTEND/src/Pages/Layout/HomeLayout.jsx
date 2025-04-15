import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../../Components/Header/Navbar";
import Footer from "../../Components/Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default HomeLayout;
