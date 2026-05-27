const Task = require("../models/Task");


// GET TASKS
const getTasks = async (req, res) => {

  try {

    const tasks =
      await Task.find({
        userId: req.user.id
      });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE TASK
const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      tags
    } = req.body;

    const task =
      await Task.create({

        title,
        description,
        tags,
        userId: req.user.id
      });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {

  try {

    const task =
      await Task.findByIdAndUpdate(

        req.params.id,

        req.body,

        { new: true }
      );

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};