import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
export const getFetchSeller = createAsyncThunk("seller/getSeller", async () => {
  try {
    const response = await axiosPublic.get("/shop", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
export const getAllSeller = createAsyncThunk(
  "seller/getAllSeller",
  async () => {
    try {
      const response = await axiosPublic.get("/shop/get/all-shop", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
