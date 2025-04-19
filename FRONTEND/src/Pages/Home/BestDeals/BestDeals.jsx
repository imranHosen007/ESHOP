import React, { useEffect, useState } from "react";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestDeals = () => {
  const { allProduct, isLoading } = useSelector((store) => store.product);

  const [data, setData] = useState([]);

  useEffect(() => {
    const allProductsData = allProduct ? [...allProduct] : [];
    const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, []);

  return (
    <div className="section">
      <h1 className="heading">Best Deals</h1>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px mb-12 border-0">
        {data &&
          data.length !== 0 &&
          data.slice(0, 5).map((item, index) => {
            return <ProductCard item={item} key={index} />;
          })}
        {data && data.length == 0 && (
          <h4 className="flex justify-center py-10 font-bold text-2xl">
            {" "}
            No Proudct have!
          </h4>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
