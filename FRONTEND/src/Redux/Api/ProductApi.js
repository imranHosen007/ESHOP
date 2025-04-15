import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) => {
    try {
      const response = await axiosPublic.post(
        `/product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const shopGetProducts = createAsyncThunk(
  "product/getShopProduct",
  async id => {
    try {
      const response = await axiosPublic.get(`/product/allproduct/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const getAllProducts = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    try {
      const response = await axiosPublic.get(`/product`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
