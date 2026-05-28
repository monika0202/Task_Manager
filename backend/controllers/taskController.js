const Task = require("../models/Task");


const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



const createTask = async (req, res) => {
  try {
    console.log("CREATE TASK BODY:", req.body);

    const {
      title,
      description,
      status,
      tags,
      dueDate,
    } = req.body;

  
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description || "",
      status: status || "Pending",


      tags: tags || [],
      dueDate: dueDate || null,

      userId: req.user.id,
    });

    console.log("TASK CREATED:", task);

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title ?? task.title,
          description: req.body.description ?? task.description,

         

          tags: req.body.tags ?? task.tags,
          status: req.body.status ?? task.status,
          dueDate: req.body.dueDate ?? task.dueDate,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};