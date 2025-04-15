import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
export const getUserWishlist = createAsyncThunk(
  "wishlist/getUserWishlist",
  async id => {
    try {
      const response = await axiosPublic.get(`/wishlist/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
