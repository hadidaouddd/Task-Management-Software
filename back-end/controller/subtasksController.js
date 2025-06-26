const prisma = require("../_prisma");

exports.getSubtasksByTask = async (req, res) => {
  try {
    const taskId = Number(req.params.taskId);
    const subtasks = await prisma.subtasks.findMany({
      where: { task_id: taskId },
    });
    res.json(subtasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubtask = async (req, res) => {
  try {
    const { title, is_completed, task_id } = req.body;
    const subtask = await prisma.subtasks.create({
      data: { title, is_completed, task_id },
    });
    res.status(201).json(subtask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSubtask = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subtasks.delete({ where: { id: Number(id) } });
    res.json({ message: "Subtask deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
exports.updateSubtaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_completed } = req.body;

    const updatedSubtask = await prisma.subtasks.update({
      where: { id: Number(id) },
      data: { is_completed },
    });

    res.json(updatedSubtask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
