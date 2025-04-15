import express from "express";
import { isAdmin, isAuthenticated, isSeller } from "../Middleware/Auth.js";
import {
  createOrder,
  deleteOrders,
  getAllOrder,
  getSellerOrder,
  getUserOrder,
  giveRefundRequest,
  orderRefundSuccess,
  updateOrderStatus,
} from "../Controllers/Order.Controller.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrder);
router.get("/:id", getUserOrder);
router.get("/seller/:id", getSellerOrder);
router.get(`/get/all-orders`, isAuthenticated, isAdmin, getAllOrder);
router.put("/status/:id", isSeller, updateOrderStatus);
router.put("/refund/:id", isSeller, giveRefundRequest);
router.put("/refund-success/:id", isSeller, orderRefundSuccess);
router.delete("/:id", deleteOrders);
export default router;
