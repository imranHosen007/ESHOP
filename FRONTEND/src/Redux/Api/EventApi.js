import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
export const getShopEvent = createAsyncThunk("event/getShopEvent", async id => {
  try {
    const response = await axiosPublic.get(`/event/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
export const getAllEvent = createAsyncThunk("event/getAllEvent", async () => {
  try {
    const response = await axiosPublic.get(`/event`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
