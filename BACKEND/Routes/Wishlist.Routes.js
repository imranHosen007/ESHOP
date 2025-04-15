import express from "express";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlit,
} from "../Controllers/Wishlist.Controllers.js";

const router = express.Router();
router.post(`/`, addToWishlist);
router.get(`/:id`, getUserWishlist);
router.delete("/:id", removeFromWishlit);
export default router;
