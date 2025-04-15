import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];
const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];
const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Reviews",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Shipping",
  },
  {
    name: "Live chat",
  },
];

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="sm:px-12 px-4 bg-[#342ac8] py-7 md:flex md:justify-between md:items-center">
        <h1 className="mb-6 text-3xl font-semibold lg:text-4xl md:mb-0 lg:leading-normal md:w-2/5">
          <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                md:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Button
          </button>
        </div>
      </div>
      {/* -----Footer-Bottom------ */}
      <div className="grid grid-cols-1 gap-6 px-5 py-16 sm:grid-cols-3 lg:grid-cols-4 sm:px-8 sm:text-center">
        {/* ----Frist-Col--- */}
        <ul className="flex flex-col items-center px-5 text-center sm:text-start sm:block">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p>The home and elements needeed to create beatiful products.</p>
          <div className="flex items-center  mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>
        {/* ----Secoend-Col----- */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>

          {footerProductLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link
                  key={link.link}
                  className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ------Third-col-------- */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((item, index) => {
            return (
              <li key={index}>
                <Link className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400">
                  {" "}
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* ------Fourth-Col------ */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => {
            return (
              <li key={index}>
                <Link className="text-sm leading-6 text-gray-400 duration-300 cursor-pointer hover:text-teal-400">
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
