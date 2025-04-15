import Shop from "../Models/Shop.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";

import { ShopToken } from "../Utils/ShopToken.js";
import Product from "../Models/Product.Model.js";
export const createShop = async (req, res, next) => {
  try {
    const { email, name, address, password, zipCode, phoneNumber } = req.body;
    const exitsingSeller = await Shop.findOne({ email });

    if (exitsingSeller) {
      return next(new ErrorHandler("Seller already exists", 400));
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });

    const seller = {
      name,
      email,
      password,
      address,
      phoneNumber,
      zipCode,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    };
    const newShop = await Shop.create(seller);
    ShopToken(newShop, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const loginShop = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }
    const user = await Shop.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }
    ShopToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const logoutShop = async (req, res, next) => {
  try {
    res.cookie("shop_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.user._id);

    if (!shop) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }
    res.status(200).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
export const getSingleShop = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ---Update-Shop-Avatar----
export const updateShopAvatar = async (req, res, next) => {
  try {
    const existsShop = await Shop.findById(req.user._id);
    if (req.body.avatar !== "") {
      const imageId = existsShop.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsShop.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    await existsShop.save();
    res.status(200).json({
      success: true,
      shop: existsShop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
// Update-Shop-Infromation
export const updateShopInformation = async (req, res, next) => {
  try {
    const { password, name, address, phoneNumber, zipCode } = req.body;
    const shop = await Shop.findById(req.user._id).select("+password");

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 400));
    }
    const isPasswordValid = await shop.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct Password", 400));
    }
    shop.name = name;
    shop.address = address;
    shop.zipCode = zipCode;
    shop.phoneNumber = phoneNumber;

    await shop.save();
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// getAllShop

export const getAllShop = async (req, res, next) => {
  try {
    const shops = await Shop.find();
    res.status(200).json({
      success: true,
      shops,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const deleteSeller = async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    const imageId = shop.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    const proudcts = await Product.find({ shopId: req.params.id });
    await Product.deleteMany(proudcts);
    await Shop.deleteOne(shop);
    res.status(201).json({
      success: true,
      message: "Shop deleted successfully!",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const updatedPaymentMethod = async (req, res, next) => {
  try {
    const seller = await Shop.findByIdAndUpdate(req.user._id, {
      withdrawMethod: req.body,
    });

    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const deletePaymentMethod = async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.user._id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found with this id", 400));
    }

    seller.withdrawMethod = null;

    await seller.save();

    res.status(201).json({
      success: true,
      seller,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
