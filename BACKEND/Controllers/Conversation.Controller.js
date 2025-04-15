import Conversation from "../Models/Conversation.Model.js";
import Shop from "../Models/Shop.Models.js";
import User from "../Models/User.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const createConversation = async (req, res, next) => {
  try {
    const { groupTitle, userId, sellerId } = req.body;
    const isConversationExist = await Conversation.findOne({ groupTitle });
    if (isConversationExist) {
      const conversation = isConversationExist;
      res.status(201).json({
        success: true,
        conversation,
      });
    } else {
      const user = await User.findById(userId);
      const seller = await Shop.findById(sellerId);

      const conversation = await Conversation.create({
        groupTitle: groupTitle,
        members: [userId, sellerId],
        user: user,
        seller: seller,
      });
      res.status(201).json({
        success: true,
        conversation,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// Seller-Conversation

export const sellerConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
export const userConversation = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      members: {
        $in: [req.params.id],
      },
    }).sort({ updatedAt: -1, createdAt: -1 });

    res.status(201).json({
      success: true,
      conversations,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

export const updateLastMessage = async (req, res, next) => {
  try {
    const { lastMessage, lastMessageId } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
      lastMessage,
      lastMessageId,
    });
    res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};
