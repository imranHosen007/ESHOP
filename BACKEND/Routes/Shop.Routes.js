import express from "express";
import {
  createShop,
  deletePaymentMethod,
  deleteSeller,
  getAllShop,
  getShop,
  getSingleShop,
  loginShop,
  logoutShop,
  updatedPaymentMethod,
  updateShopAvatar,
  updateShopInformation,
} from "../Controllers/Shop.Controllers.js";

import { isAdmin, isAuthenticated, isSeller } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/", createShop);
router.post("/login", loginShop);
router.get("/", isSeller, getShop);
router.get("/logout", logoutShop);
router.get("/:id", getSingleShop);
router.get(`/get/all-shop`, isAuthenticated, isAdmin, getAllShop);
router.put("/updated-avatar", isSeller, updateShopAvatar);
router.put(`/updated-information`, isSeller, updateShopInformation);
router.delete("/:id", deleteSeller);
router.delete(`/delete/payment-method`, isSeller, deletePaymentMethod);
router.put(`/updated-payment-method`, isSeller, updatedPaymentMethod);

export default router;
