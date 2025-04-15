import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, shopGetProducts } from "../Api/ProductApi";

const initialState = {
  isLoading: true,
  error: null,
  product: [],
  productError: null,
  allProduct: [],
};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(shopGetProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(shopGetProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.products;
      })
      .addCase(shopGetProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productError = action.error.message;
      })
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProduct = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productError = action.error.message;
      });
  },
  reducers: {
    deleteProduct: (store, action) => {
      store.product = store.product.filter(item => {
        return item._id !== action.payload;
      });
    },

    removeProduct: (store, action) => {
      store.allProduct = store.allProduct.filter(item => {
        return item._id !== action.payload;
      });
    },
  },
});

export const { deleteProduct, removeProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
