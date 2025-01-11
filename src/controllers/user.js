import ErrorHandler from "../utils/ErrorHandler.js";
import { responseHandler } from "../utils/responseHandler.js";
import User from "../Models/userModel.js";

export const getUser = responseHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).populate("tasks");
    if (!user) {
      throw new ErrorHandler(401, "User not found");
    }
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    throw new ErrorHandler(
      error.statusCode || 500,
      error.message || "Can't fetch user right now"
    );
  }
});

export const getTasks = responseHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId }).populate("tasks");
    if (!user) {
      throw new ErrorHandler(401, "User not found");
    }
    console.log(user);
    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: user.tasks,
    });
  } catch (error) {
    throw new ErrorHandler(
      error.statusCode || 500,
      error.message || "Can't fetch tasks right now"
    );
  }
});
