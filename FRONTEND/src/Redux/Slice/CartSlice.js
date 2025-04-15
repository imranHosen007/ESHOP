import { createSlice } from "@reduxjs/toolkit";
import { getUserCart } from "../Api/CartApi";

const initialState = {
  isLoading: true,
  error: null,
  cart: [],
  productError: null,
  allCart: [],
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.carts;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.productError = action.error.message;
      });
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (store, action) => {
      store.cart = store.cart.filter((item) => {
        return item._id !== action.payload;
      });
    },
    valueChangeFromCart: (state, action) => {
      const item = state.cart.find((data) => {
        return data._id === action.payload.id;
      });
      item.quantity = action.payload.quantity;
    },
  },
});

export const { addToCart, removeFromCart, valueChangeFromCart } =
  CartSlice.actions;
export default CartSlice.reducer;
