import Tasks from "../models/Tasks.js";

const createTask = async (req, res) => {
  try {
    const { title, description, group_id, assigned_to } = req.body;
    const task = await Tasks.create({ title, description, group_id, assigned_to });

    return res.status(201).json({ message: "Task created", task });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
    createTask,
    getTasks
}
