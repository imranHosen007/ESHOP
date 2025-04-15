import express from "express";
import { upload } from "../Utils/Multer.js";
import {
  createNewUser,
  deleteUser,
  delteAddress,
  getAllUsers,
  getUser,
  loginUser,
  LogoutUser,
  passwordChange,
  singleUserInfo,
  updateAvatar,
  updateUserAddress,
  updateUserInformation,
} from "../Controllers/User.Controllers.js";
import { isAdmin, isAuthenticated } from "../Middleware/Auth.js";

const router = express.Router();
router.post("/create-user", upload.single("file"), createNewUser);
router.post(`/login`, loginUser);
router.get("/", isAuthenticated, getUser);
router.get(`/logout`, LogoutUser);
router.get(`/:id`, singleUserInfo);
router.get(`/get/all-users`, isAuthenticated, isAdmin, getAllUsers);
router.put("/", isAuthenticated, updateUserInformation);
router.put("/update-address", isAuthenticated, updateUserAddress);
router.put("/password-change", isAuthenticated, passwordChange);
router.put("/update-avatar", isAuthenticated, updateAvatar);
router.delete("/delete-address/:id", isAuthenticated, delteAddress);
router.delete("/:id", deleteUser);

export default router;
