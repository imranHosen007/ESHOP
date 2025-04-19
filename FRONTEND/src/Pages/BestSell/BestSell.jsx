import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";

import { useSelector } from "react-redux";

const BestSell = () => {
  const [data, setData] = useState([]);
  const { allProduct, isLoading } = useSelector((store) => store.product);

  useEffect(() => {
    const d = allProduct ? [...allProduct] : [];
    const bestSell = d.sort((a, b) => b.sold_out - a.sold_out);
    setData(bestSell);
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="py-10 section">
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px mb-12 border-0">
        {data &&
          data.length !== 0 &&
          data.map((item, index) => {
            return <ProductCard key={index} item={item} />;
          })}
      </div>
      {data && data.length == 0 && (
        <h1 className="text-center w-full pb-[100px] text-[20px]">
          No products Found!
        </h1>
      )}
    </div>
  );
};

export default BestSell;
