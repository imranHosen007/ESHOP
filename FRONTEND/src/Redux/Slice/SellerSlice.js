import { createSlice } from "@reduxjs/toolkit";
import { getAllSeller, getFetchSeller } from "../Api/SellerApi";

const initialState = {
  isSeller: false,
  loading: true,
  error: null,
  seller: [],
  allSeller: [],
};

const SellerSlice = createSlice({
  name: "seller",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getFetchSeller.pending, state => {
        state.loading = true;
        state.isSeller = false;
      })
      .addCase(getFetchSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload.shop;
        state.isSeller = true;
      })
      .addCase(getFetchSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSeller = false;
      })
      .addCase(getAllSeller.fulfilled, (state, action) => {
        state.allSeller = action.payload.shops;
        state.loading = false;
      })
      .addCase(getAllSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  reducers: {
    removeSeller: (state, action) => {
      state.allSeller = state.allSeller.filter(item => {
        return item._id !== action.payload;
      });
    },
  },
});
export const { removeSeller } = SellerSlice.reducer;
export default SellerSlice.reducer;
