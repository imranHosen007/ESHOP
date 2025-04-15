import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleProductDeatils from "../../Components/SingleProduct/SingleProductDeatils";
import SuggestProducts from "../../Components/SingleProduct/SuggestProducts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, shopGetProducts } from "../../Redux/Api/ProductApi";

const ProductsDetailsPage = () => {
  const { allProduct } = useSelector(store => store.product);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());

    const data = allProduct.find(item => item._id == id);
    setData(data);
    scroll(0, 0);
    dispatch(shopGetProducts(data?.shop?._id));
  }, []);

  return (
    <div>
      <SingleProductDeatils data={data} />
      {data && <SuggestProducts data={data} />}
    </div>
  );
};

export default ProductsDetailsPage;
