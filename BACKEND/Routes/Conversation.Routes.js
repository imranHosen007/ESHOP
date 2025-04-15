import express from "express";
import {
  createConversation,
  sellerConversation,
  updateLastMessage,
  userConversation,
} from "../Controllers/Conversation.Controller.js";
import { isAuthenticated, isSeller } from "../Middleware/Auth.js";

const router = express.Router();
router.post("/", createConversation);
router.get("/seller/:id", isSeller, sellerConversation);
router.get("/user/:id", isAuthenticated, userConversation);
router.put(`/update/:id`, updateLastMessage);
export default router;
