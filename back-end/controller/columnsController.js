const prisma = require("../_prisma");

exports.getColumnsByBoard = async (req, res) => {
  try {
    const boardId = Number(req.params.boardId);
    const columns = await prisma.columns.findMany({
      where: { board_id: boardId },
      include: {
        tasks: {
          include: {
            subtasks: true,
          },
        },
      },
    });
    res.json(columns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createColumn = async (req, res) => {
  try {
    const { name, board_id, position } = req.body;
    const column = await prisma.columns.create({
      data: { name, board_id, position },
    });
    res.status(201).json(column);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteColumn = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.columns.delete({ where: { id: Number(id) } });
    res.json({ message: "Column deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
