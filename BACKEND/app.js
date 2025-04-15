import express from "express";
import cors from "cors";
export const app = express();
import { config } from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// -------using-MiddleWare------

config({
  path: "./.env",
});
const corsOptions = {
  origin: [`http://localhost:5173`],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "50mb", extended: true }));
app.use("/", express.static("./Public"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// -------Import-Routing-------
import UserRoutes from "./Routes/User.Routes.js";
import ErrorMiddleware from "./Middleware/Error-Middleware.js";
import ShopRoutes from "./Routes/Shop.Routes.js";
import ProductRoutes from "./Routes/Product.Routes.js";
import EventRoutes from "./Routes/Event.Routes.js";
import CouponRoutes from "./Routes/Coupon.Routes.js";
import CartRoutes from "./Routes/Cart.Routes.js";
import WishlistRoutes from "./Routes/Wishlist.Routes.js";
import PaymentRoutes from "./Controllers/Payment.Controller.js";
import OrderRoutes from "./Routes/Order.Routes.js";
import ConversationRoutes from "./Routes/Conversation.Routes.js";
import MessageRoutes from "./Routes/Message.Routes.js";
import WithdrawRoutes from "./Routes/Withdraw.Routes.js";

app.use(`/user`, UserRoutes);
app.use(`/shop`, ShopRoutes);
app.use(`/product`, ProductRoutes);
app.use(`/event`, EventRoutes);
app.use(`/coupon`, CouponRoutes);
app.use(`/cart`, CartRoutes);
app.use(`/wishlist`, WishlistRoutes);
app.use(`/payment`, PaymentRoutes);
app.use(`/order`, OrderRoutes);
app.use(`/conversation`, ConversationRoutes);
app.use(`/message`, MessageRoutes);
app.use(`/withdraw`, WithdrawRoutes);

// it's for ErrorHandling
app.use(ErrorMiddleware);
