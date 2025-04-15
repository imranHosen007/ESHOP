import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
const Rating = ({ rating }) => {
  const ratings = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating > index + 1 ? (
          <AiFillStar
            size={20}
            color="#f6b100"
            className="mr-2 cursor-pointer"
          />
        ) : rating > number ? (
          <BsStarHalf
            size={20}
            color="#f6b100"
            className="mr-2 cursor-pointer"
          />
        ) : (
          <AiOutlineStar
            size={20}
            color="#f6b100"
            className="mr-2 cursor-pointer"
          />
        )}
      </span>
    );
  });

  return <div className="flex">{ratings}</div>;
};

export default Rating;
