import jwt from "jsonwebtoken";
import User from "../Models/User.Models.js";
import { asyncHandler } from "./CatchAsyncHandler.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Shop from "../Models/Shop.Models.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET_TOKEN_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: true,
          message: "forbidden user or token has expired",
        });
      }
      return decoded;
    }
  );

  req.user = await User.findById(decodedData.id);

  next();
});

export const isSeller = async (req, res, next) => {
  const { shop_token } = req.cookies;
  if (!shop_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decodedData = jwt.verify(
    shop_token,
    process.env.JWT_SECRET_TOKEN_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).send({
          error: true,
          message: "forbidden user or token has expired",
        });
      }
      return decoded;
    }
  );

  req.user = await Shop.findById(decodedData.id);

  next();
};

export const isAdmin = async (req, res, next) => {
  const email = req.user.email;

  const user = await User.findOne({ email: email });
  const admin = user?.role === "admin";
  if (!admin) {
    return next(
      new ErrorHandler(`${user.role} can not access this resources!`)
    );
  }
  next();
};
