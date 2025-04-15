import Cart from "../Models/Cart.Model.js";
import Wishlist from "../Models/Wishlist.Model.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const addToCart = async (req, res, next) => {
  try {
    const exitsingCart = await Cart.findOne({ productId: req.body.productId });

    if (exitsingCart) {
      return next(new ErrorHandler("Product Already In Cart", 400));
    }

    await Wishlist.findOneAndDelete({ productId: req.body.productId });
    const cartData = await Cart.create(req.body);
    res.status(201).json({
      success: true,
      cartData,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
export const getAllCart = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    // .sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      carts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
export const getUserCart = async (req, res, next) => {
  try {
    const carts = await Cart.find({
      userEmail: req.params.id,
    });
    res.status(201).json({
      success: true,
      carts,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const delteCart = async (req, res, next) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) {
      return res.status(401).json({ message: "Cart Id Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Cart Items Deleted SuccesFull" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const updateCartQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true, runValidators: true }
    );

    if (!updatedCart) {
      return next(new ErrorHandler("Product Not Upadted", 400));
    }
    res.status(201).json({
      success: true,
      updatedCart,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
