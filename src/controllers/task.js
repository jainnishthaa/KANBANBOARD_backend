import Task from "../Models/taskModel.js";
import User from "../Models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { responseHandler } from "../utils/responseHandler.js";

export const getTask = responseHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await Task.find({ _id: id });
    if (!task) {
      throw new ErrorHandler(401, "Task not found");
    }
    res.status(200).json({
      message: "task fetched successfully",
      task: task,
    });
  } catch (error) {
    throw new ErrorHandler(
      error.status || 500,
      error.message || "can't fetch task right now"
    );
  }
});

export const postAdd = responseHandler(async (req, res, next) => {
  try {
    const { title, desc, date, status } = req.body;
    const user = await User.findOne({ _id: req.user.userId });
    
    if (!title || !desc || !date || !status) {
      throw new ErrorHandler(400, "Please fill all the fields");
    }
    const task = await Task.create({
      title: title,
      desc: desc,
      date: date,
      status: status,
      user: req.user.userId,
    });
    console.log(task)
    user.tasks.push(task._id);
    console.log(user)
    await user.save();
    res.status(201).json({
      message: "task created successfully",
      task: task,
    });
  } catch (error) {
    throw new ErrorHandler(
      error.status || 500,
      error.message || "can't create task right now"
    );
  }
});

export const postEdit = responseHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, desc, date } = req.body;
    const task = await Task.findOne({ _id: id });
    if (!task) {
      throw new ErrorHandler(401, "Task not found");
    }
    if (title) {
      task.title = title;
    }
    if (desc) {
      task.desc = desc;
    }
    if (date) {
      task.date = date;
    }
    await task.save();
    res.status(200).json({
      message: "task updated successfully",
      task: task,
    });
  } catch (error) {
    throw new ErrorHandler(
      error.status || 500,
      error.message || "can't update task right now"
    );
  }
});

export const getDelete = responseHandler(async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      throw new ErrorHandler(401, "Task not found");
    }
    await User.findByIdAndUpdate(task.user, { $pull: { tasks: taskId } });
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "task deleted successfully" });
  } catch (error) {
    throw new ErrorHandler(
      error.status || 500,
      error.message || "can't delete task right now"
    );
  }
});

export const postMove = responseHandler(async (req, res, next) => {
  try {
    const taskId = req.params.id;
    console.log(taskId);
    const { status } = req.body;
    const task = await Task.findById(taskId);
    if (!task) {
      throw new ErrorHandler(401, "Task not found");
    }
    task.status = status;
    await task.save();
    res.status(200).json({
      message: "task moved succesfully",
      task: task,
    });
  } catch (error) {
    throw new ErrorHandler(
      error.status || 500,
      error.message || "can't move task right now"
    );
  }
});
