import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
export const getUserCart = createAsyncThunk("cart/getUserCart", async id => {
  try {
    const response = await axiosPublic.get(`/cart/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
