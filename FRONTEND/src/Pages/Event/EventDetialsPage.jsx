import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleProductDeatils from "../../Components/SingleProduct/SingleProductDeatils";
import SuggestProducts from "../../Components/SingleProduct/SuggestProducts";

const EventDetialsPage = () => {
  const { allEvent, isLoading } = useSelector((store) => store.event);
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = allEvent.find((item) => item._id == id);
    setData(data);
    scroll(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <SingleProductDeatils data={data} />
      {data && <SuggestProducts data={data} />}
    </div>
  );
};

export default EventDetialsPage;
