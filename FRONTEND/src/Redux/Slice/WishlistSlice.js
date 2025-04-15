import { createSlice } from "@reduxjs/toolkit";
import { getUserWishlist } from "../Api/WishlistApi";

const initialState = {
  isLoading: true,
  error: null,
  wishlist: [],
  productError: null,
  allWishlist: [],
};
const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getUserWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload.wishlist;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.productError = action.error.message;
      });
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
    removeFromWishlit: (state, action) => {
      state.wishlist = state.wishlist.filter(item => {
        return item.productId !== action.payload;
      });
    },
  },
});

export const { addToWishlist, removeFromWishlit } = WishlistSlice.actions;
export default WishlistSlice.reducer;
