import ProductCard from "../../../Components/ProductCard/ProductCard";

import { useSelector } from "react-redux";

const FeaturedProducts = () => {
  const { allProduct, isLoading } = useSelector(store => store.product);

  return (
    <div className="section">
      <h1 className="heading">Featured Products</h1>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px mb-12 border-0">
        {allProduct &&
          allProduct?.length !== 0 &&
          allProduct.map((item, index) => {
            return <ProductCard key={index} item={item} />;
          })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
