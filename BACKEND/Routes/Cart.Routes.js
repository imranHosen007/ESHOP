import express from "express";
import { isAuthenticated } from "../Middleware/Auth.js";
import {
  addToCart,
  delteCart,
  getAllCart,
  getUserCart,
  updateCartQuantity,
} from "../Controllers/Cart.Controllers.js";

const router = express.Router();

router.post(`/`, addToCart);
router.get(`/`, getAllCart);
router.get(`/:id`, getUserCart);
router.delete(`/:id`, isAuthenticated, delteCart);
router.put(`/:id`, updateCartQuantity);
export default router;
