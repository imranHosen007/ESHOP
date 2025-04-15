import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import SellerSlice from "./Slice/SellerSlice";
import ProductSlice from "./Slice/ProductSlice";
import EventSlice from "./Slice/EventSlice";
import CartSlice from "./Slice/CartSlice";
import WishlistSlice from "./Slice/WishlistSlice";
import OrderSlice from "./Slice/OrderSlice";

const store = configureStore({
  reducer: {
    user: UserSlice,
    seller: SellerSlice,
    product: ProductSlice,
    event: EventSlice,
    cart: CartSlice,
    wishlist: WishlistSlice,
    order: OrderSlice,
  },
});

export default store;
