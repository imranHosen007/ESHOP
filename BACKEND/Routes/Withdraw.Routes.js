import express from "express";
import {
  createWithdrawRequest,
  getAllWithdrawRequest,
  updateWithdrawRequest,
} from "../Controllers/Withdraw.Controller.js";
import { isAuthenticated } from "../Middleware/Auth.js";
const router = express.Router();
router.post("/", createWithdrawRequest);
router.get("/", getAllWithdrawRequest);
router.put("/:id", updateWithdrawRequest);
export default router;
