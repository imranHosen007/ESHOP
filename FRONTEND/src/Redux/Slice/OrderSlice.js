import { createSlice } from "@reduxjs/toolkit";
import { getAllOrder, getOrderByShop, getUserOrder } from "../Api/OrderApi";

const initialState = {
  isLoading: true,
  error: null,
  order: [],
  allOrder: [],
  AllOrder: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getUserOrder.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.orders;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByShop.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrderByShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrder = action.payload.orders;
      })
      .addCase(getOrderByShop.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AllOrder = action.payload.orders;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
  reducers: {
    removeOrder: (store, action) => {
      store.AllOrder = store.AllOrder.filter(item => {
        return item._id !== action.payload;
      });
    },
  },
});

export const { removeOrder } = OrderSlice.actions;
export default OrderSlice.reducer;
