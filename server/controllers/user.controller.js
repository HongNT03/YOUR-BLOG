import User from "../model/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcrypt from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorhandler(403, "You dont allow to update this user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorhandler(400, "Password must be at least 6 characters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorhandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorhandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorhandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorhandler(403, "You dont allow to delete this user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorhandler(403, "You are not allowed to create a post"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const UserWithoutPass = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    const totalUser = await User.countDocuments();
    const now = new Date();
    const aMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastmonthUser = await User.countDocuments({
      createdAt: { $gte: aMonthAgo },
    });
    res.status(200).json({
      users: UserWithoutPass,
      totalUser: totalUser,
      lastmonthUser: lastmonthUser,
    });
  } catch (error) {
    next(error);
  }
};
