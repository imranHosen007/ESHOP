import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
export const getUserOrder = createAsyncThunk("order/getUserOrder", async id => {
  try {
    const response = await axiosPublic.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const getOrderByShop = createAsyncThunk(
  "order/getOrderByShop=",
  async id => {
    try {
      const response = await axiosPublic.get(`/order/seller/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
export const getAllOrder = createAsyncThunk("order/getAllOrder", async () => {
  try {
    const response = await axiosPublic.get(`/order/get/all-orders`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
