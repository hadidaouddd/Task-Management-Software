const prisma = require("../_prisma");

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await prisma.boards.findMany({ include: { columns: true } });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const { title, columns } = req.body;

    const boardData = {
      title,
    };

    if (Array.isArray(columns) && columns.length > 0) {
      boardData.columns = {
        create: columns.map((column) => ({
          name: column.name,
          // position: column.position, // if you're not using this anymore, you can remove it
          color: column.color || "#ccc", // optional default color
        })),
      };
    }

    const board = await prisma.boards.create({
      data: boardData,
      include: { columns: true },
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.boards.delete({ where: { id: Number(id) } });
    res.json({ message: "Board deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const boardId = Number(req.params.id);
    const { title, columns } = req.body;

    const updatedBoard = await prisma.boards.update({
      where: { id: boardId },
      data: { title },
    });

    for (const column of columns) {
      if (column.id) {
        await prisma.columns.update({
          where: { id: column.id },
          data: {
            name: column.name,
          },
        });
      } else {
        await prisma.columns.create({
          data: {
            name: column.name,
            board_id: boardId,
          },
        });
      }
    }

    const result = await prisma.boards.findUnique({
      where: { id: boardId },
      include: { columns: true },
    });

    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
