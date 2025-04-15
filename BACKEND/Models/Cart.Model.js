import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, "Please enter your Email!"],
  },
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  images: [{ type: String }],
  productId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  quantity: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
