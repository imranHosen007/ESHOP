import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div
      className="relative min-h-[60vh] md:min-h-[70vh] w-full bg-no-repeat flex items-center z-[-3] bg-cover"
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className="section  w-[90%] md:w-[60%]">
        <h1 className="text-[35px] leading-[1.2] md:text-[60px] text-[#3d3a3a] font-[600] capitalize">
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to={"/profile"}>
          <div className="btn mt-5">
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
