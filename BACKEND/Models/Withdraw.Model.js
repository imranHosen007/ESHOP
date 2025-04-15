import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema({
  seller: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

const Withdraw = mongoose.model("Withdraw", WithdrawSchema);

export default Withdraw;
