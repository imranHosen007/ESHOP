import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [URLSearchParams] = useSearchParams();
  const categoryData = URLSearchParams.get("category");
  const { allProduct, isLoading } = useSelector((store) => store.product);

  useEffect(() => {
    if (categoryData === null) {
      const allProductsData = allProduct ? [...allProduct] : [];
      const d =
        allProductsData &&
        allProductsData.sort((a, b) => a.total_sell - b.total_sell);
      setData(d);
    } else {
      const allProductsData = allProduct ? [...allProduct] : [];
      const d =
        allProductsData &&
        allProductsData.filter((item) => item.category === categoryData);
      setData(d);
    }
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
    <div className="section py-10">
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px mb-12 border-0">
        {data &&
          data.map((item, index) => {
            return <ProductCard key={index} item={item} />;
          })}
      </div>
      {data.length === 0 && (
        <h1 className="text-center w-full pb-[100px] text-[20px]">
          No products Found!
        </h1>
      )}
    </div>
  );
};

export default ProductsPage;
