const prisma = require("../_prisma");

exports.getTasksByColumn = async (req, res) => {
  try {
    const columnId = Number(req.params.columnId);
    const tasks = await prisma.tasks.findMany({
      where: { column_id: columnId },
      include: { subtasks: true },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, column_id, subtasks = [] } = req.body;

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        column_id,
        subtasks: {
          create: subtasks.map((s) => ({ title: s.title })),
        },
      },
      include: {
        subtasks: true,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.tasks.delete({ where: { id: Number(id) } });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = Number(req.params.id);
  const { title, description, column_id, subtasks } = req.body;

  try {
    const task = await prisma.tasks.findUnique({
      where: { id: taskId },
      include: { subtasks: true },
    });

    if (!task) {
      return res
        .status(404)
        .json({ error: `Task with ID ${taskId} not found.` });
    }
    const updatedTask = await prisma.tasks.update({
      where: { id: taskId },
      data: {
        title,
        description,
        column_id,
      },
    });
    if (Array.isArray(subtasks)) {
      await prisma.subtasks.deleteMany({ where: { task_id: taskId } });
      for (const sub of subtasks) {
        await prisma.subtasks.create({
          data: {
            title: sub.title,
            is_completed: sub.is_completed ?? false,
            task_id: taskId,
          },
        });
      }
    }

    const finalTask = await prisma.tasks.findUnique({
      where: { id: taskId },
      include: { subtasks: true },
    });

    res.json(finalTask);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: error.message });
  }
};
