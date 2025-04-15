import express from "express";
import {
  createCouponCode,
  deleteCouponCode,
  getCouponValue,
  shopCouponCode,
} from "../Controllers/Coupon.Controllers.js";
import { isSeller } from "../Middleware/Auth.js";

const router = express.Router();
router.post("/", isSeller, createCouponCode);
router.get("/:id", shopCouponCode);
router.delete("/:id", deleteCouponCode);
router.get("/coupon-value/:id", getCouponValue);
export default router;
