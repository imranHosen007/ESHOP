import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const SuggestProducts = ({ data }) => {
  const { allProduct } = useSelector(store => store.product);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const filterRedItems = allProduct.filter(
      product => product.category === data.category
    );
    setProducts(filterRedItems);
  }, []);

  return (
    <div className="section p-4">
      {data ? (
        <div>
          <h1 className="heading border-b mb-5 text-[25px] font-[500]">
            Releted Products
          </h1>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px mb-12 border-0">
            {" "}
            {products &&
              products.map((item, index) => {
                return <ProductCard key={index} item={item} />;
              })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestProducts;
