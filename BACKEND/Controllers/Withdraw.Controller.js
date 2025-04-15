import Shop from "../Models/Shop.Models.js";
import Withdraw from "../Models/Withdraw.Model.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const createWithdrawRequest = async (req, res, next) => {
  try {
    const { amount, seller } = req.body;

    const data = {
      seller,
      amount,
    };
    const shop = await Shop.findById(seller._id);
    shop.availableBalance = shop.availableBalance - amount;
    await shop.save();

    const withdraw = await Withdraw.create(data);
    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
export const getAllWithdrawRequest = async (req, res, next) => {
  try {
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      withdraws,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
export const updateWithdrawRequest = async (req, res, next) => {
  try {
    const { sellerId } = req.body;
    const withdraw = await Withdraw.findByIdAndUpdate(
      req.params.id,
      {
        status: "succeed",
        updatedAt: Date.now(),
      },
      { new: true }
    );
    const seller = await Shop.findById(sellerId);
    const transection = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };

    seller.transections = [...seller.transections, transection];

    await seller.save();
    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
