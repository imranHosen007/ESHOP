import Coupon from "../Models/Coupon.Model.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const createCouponCode = async (req, res, next) => {
  try {
    const isCoupounCodeExists = await Coupon.find({ name: req.body.name });
    if (isCoupounCodeExists.length !== 0) {
      return next(new ErrorHandler("Coupoun code already exists!", 400));
    }
    const couponCode = await Coupon.create(req.body);
    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
export const shopCouponCode = async (req, res, next) => {
  try {
    const { id } = req.params;

    const couponCodes = await Coupon.find({ shopId: id });
    res.status(201).json({
      success: true,
      couponCodes,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
export const deleteCouponCode = async (req, res, next) => {
  try {
    const couponCode = await Coupon.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code dosen't exists!", 400));
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const getCouponValue = async (req, res, next) => {
  try {
    const couponCode = await Coupon.findOne({ name: req.params.id });
    if (!couponCode) {
      return next(new ErrorHandler("Coupon code doesn't exists!", 400));
    }
    res.status(200).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
