import Order from "../Models/Order.Model.js";
import Product from "../Models/Product.Model.js";
import Shop from "../Models/Shop.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const createProduct = async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      let images = [];
      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }
      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const productData = req.body;
      productData.images = imagesLinks;
      productData.shop = shop;
      const product = await Product.create(productData);
      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const singleShopAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({
      shopId: req.params.id,
    });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const productDelete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return next(new ErrorHandler("Product is not found", 404));
    }
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }

    await Product.deleteOne(product);
    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// -Review-For-Product-
export const createProductReview = async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;
    const product = await Product.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(rev => {
      return rev.user._id == req.user._id;
    });

    if (isReviewed) {
      product.reviews.forEach(rev => {
        if (rev.user._id == req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        } else {
          product.reviews.push(review);
        }
      });
    }
    let avg = 0;

    product.reviews.forEach(rev => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviwed succesfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(
        new ErrorHandler("Product is not available with this id", 400)
      );
    }
    res.status(201).json({
      success: true,
      message: "Products deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const updateProductInformation = async (req, res, next) => {
  try {
    const { name, stock, discountPrice, orginalPrice, description } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      stock,
      discountPrice,
      orginalPrice,
      description,
    });
    if (!product) {
      return next(
        new ErrorHandler("Product is not available with this id", 400)
      );
    }
    res.status(201).json({
      success: true,
      message: "Products Updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
