import React from "react";
import { useNavigate } from "react-router-dom";

const DropDownCategory = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleOnclick = item => {
    navigate(`/products?category=${item.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="bg-[#fff] absolute z-30 rounded-b-md shadow-sm pb-4 w-[270px]">
      {categoriesData &&
        categoriesData.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-center"
              onClick={() => handleOnclick(item)}
            >
              <img
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
                src={item?.image_Url}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default DropDownCategory;
