import { asyncHandler } from "../Middleware/CatchAsyncHandler.js";
import User from "../Models/User.Models.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

import cloudinary from "cloudinary";
import { sendToken } from "../Utils/JwtToken.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User Already Exits", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    };

    const newUser = await User.create(user);
    sendToken(newUser, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// --------Login-User------

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please provide the all fields!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exists!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct Password", 400));
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const getUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

// ----------Logout-User---------
export const LogoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// ----Update-User-Info-----

export const updateUserInformation = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Please provide the correct Password", 400));
    }
    user.name = name;
    user.phone = phone;
    await user.save();
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const updateUserAddress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const sameTypeAddress = user.addresses.find((addres) => {
      return addres.addressType === req.body.addressType;
    });

    if (sameTypeAddress) {
      return next(
        new ErrorHandler(`${req.body.addressType} address already exists`)
      );
    }
    user.addresses.push(req.body);
    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
// ---Update-Avatar-----
export const updateAvatar = async (req, res, next) => {
  try {
    const existsUser = await User.findById(req.user._id);
    if (req.body.avatar !== "") {
      const imageId = existsUser.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsUser.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    existsUser.save();
    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const delteAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );
    const user = await User.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// User-Passoword-Change

export const passwordChange = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

export const singleUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// ---getAllUser--

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// -Delete-User-
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User is not available with this id", 400));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    await User.deleteOne(user);
    res.status(201).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
