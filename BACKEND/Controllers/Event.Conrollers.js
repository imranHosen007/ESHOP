import Event from "../Models/Event.Model.js";
import Shop from "../Models/Shop.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";
export const createEvent = async (req, res, next) => {
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
      const evnetData = req.body;

      evnetData.images = imagesLinks;
      evnetData.shop = shop;
      const event = await Event.create(evnetData);
      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getAllEvent = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const shopGetEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const events = await Event.find({ shopId: id });
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return next(new ErrorHandler("Event is not found", 404));
    }
    // for (let i = 0; 1 < event.images.length; i++) {
    //   const result = await cloudinary.v2.uploader.destroy(
    //     event.images[i].public_id
    //   );
    // }
    res.status(201).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const updateEventInformation = async (req, res, next) => {
  try {
    const { name, stock, discountPrice, orginalPrice, description, endDate } =
      req.body;

    const event = await Event.findByIdAndUpdate(req.params.id, {
      name,
      stock,
      discountPrice,
      orginalPrice,
      description,
      Finish_Date: endDate,
    });
    if (!event) {
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
