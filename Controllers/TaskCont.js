const Task = require('../model/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const task = new Task({ title, description, completed });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({  
      success:false,

      message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  //dynamic routes fetching id from thr url
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    //dynamic routes fetching id from thr url

  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
