import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
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
  stock: Number,
});

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;
