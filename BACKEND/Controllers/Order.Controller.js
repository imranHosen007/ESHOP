import Cart from "../Models/Cart.Model.js";
import Order from "../Models/Order.Model.js";
import mongoose from "mongoose";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Product from "../Models/Product.Model.js";
import Shop from "../Models/Shop.Models.js";
const ObjectId = mongoose.Types.ObjectId;
export const createOrder = async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;
    const shopItemsMap = new Map();
    const newCart = [...cart];
    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }
    const qurry = newCart.map(item => new ObjectId(item._id));

    const orders = [];
    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }
    await Cart.deleteMany({ _id: qurry });

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getUserOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// --getOrderSeller-----
export const getSellerOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ "cart.shopId": req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// ----Order-Status-Update----

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async o => {
        await updateOrder(o.productId, o.quantity);
      });
    }
    order.status = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
      const serviceCharge = order.totalPrice * 0.1;
      await updateSeller(order.totalPrice - serviceCharge);
    }
    await order.save({ validateBeforeSave: false });
    async function updateOrder(id, qtn) {
      const product = await Product.findById(id);

      product.stock -= qtn;
      product.sold_out += qtn;
      await product.save({ validateBeforeSave: false });
    }

    async function updateSeller(amount) {
      const seller = await Shop.findById(req.user._id);
      seller.availableBalance += amount;
      await seller.save();
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const giveRefundRequest = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    order.status = status;

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      order,
      message: "Order Refund Request successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const orderRefundSuccess = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found with this id", 400));
    }
    order.paymentInfo.status = "Refund";
    order.status = req.body.status;
    order.save();
    if (req.body.status === "Refund Success") {
      order.cart.forEach(async o => {
        await updateOrder(o.productId, o.quantity);
      });
    }
    async function updateOrder(id, qtn) {
      const product = await Product.findById(id);

      product.stock += qtn;
      product.sold_out -= qtn;
      await product.save({ validateBeforeSave: false });
    }
    res.status(200).json({
      success: true,
      message: "Order Refund successfull!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({
      deliveredAt: -1,
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const deleteOrders = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order is not available with this id", 400));
    }

    res.status(201).json({
      success: true,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
