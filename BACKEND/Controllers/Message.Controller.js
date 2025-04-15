import Message from "../Models/Message.Model.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";
export const createMessage = async (req, res, next) => {
  try {
    const messageData = req.body;
    if (req.body.images) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
        folder: "messages",
      });
      messageData.images = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    }
    messageData.conversationId = req.body.conversationId;
    messageData.sender = req.body.sender;
    messageData.text = req.body.text;
    const message = await Message.create({
      conversationId: messageData.conversationId,
      text: messageData.text,
      sender: messageData.sender,
      images: messageData.images ? messageData.images : undefined,
    });
    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const getMessageById = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    });
    res.status(201).json({
      success: true,
      messages,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
