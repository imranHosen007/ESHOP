import Wishlist from "../Models/Wishlist.Model.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const addToWishlist = async (req, res, next) => {
  try {
    const exitsingCart = await Wishlist.findOne({
      productId: req.body.productId,
    });

    if (exitsingCart) {
      return next(new ErrorHandler("Product Already In Wishlist", 400));
    }

    const wishlistData = await Wishlist.create(req.body);
    res.status(201).json({
      success: true,
      wishlistData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getUserWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.find({
      userEmail: req.params.id,
    });
    res.status(201).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const removeFromWishlit = async (req, res, next) => {
  try {
    const deletedWishlist = await Wishlist.findOneAndDelete({
      productId: req.params.id,
    });
    if (!deletedWishlist) {
      return res.status(401).json({ message: "Wishlist Id Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Wishlist Items Deleted SuccesFull" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
