import { createAsyncThunk } from "@reduxjs/toolkit";

import useAxiosPublic from "../../Hooks/useAxiosPublic";

const axiosPublic = useAxiosPublic();
export const getFetchUser = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await axiosPublic.get("/user", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
export const getAllUser = createAsyncThunk("user/AllUser", async () => {
  try {
    const response = await axiosPublic.get("/user/get/all-users", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});
