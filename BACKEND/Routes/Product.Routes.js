import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProduct,
  productDelete,
  singleShopAllProduct,
  updateProductInformation,
} from "../Controllers/Product.Controller.js";
import { upload } from "../Utils/Multer.js";
import { isAuthenticated } from "../Middleware/Auth.js";
const router = express.Router();
router.post("/", upload.array("images"), createProduct);
router.post("/review", isAuthenticated, createProductReview);
router.get("/", getAllProduct);
router.get("/allproduct/:id", singleShopAllProduct);
router.delete("/shop-product-delete/:id", productDelete);
router.delete(`/:id`, deleteProduct);
router.put("/:id", updateProductInformation);
export default router;
