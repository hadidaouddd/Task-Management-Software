const express = require("express");
const {
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("../controller/boardsController");
const validate = require("../middlewares/validate");
const { boardSchema } = require("../validators/boardValitdator");
const router = express.Router();

router.get("/", getAllBoards);
router.post("/", validate(boardSchema), createBoard);
router.delete("/:id", deleteBoard);
router.put("/:id", updateBoard);

module.exports = router;
