const express = require("express");
const {
  getColumnsByBoard,
  createColumn,
  deleteColumn,
} = require("../controller/columnsController");
const { columnSchema } = require("../validators/columnValidator");
const validate = require("../middlewares/validate");
const router = express.Router();

router.get("/:boardId", getColumnsByBoard);
router.post("/", validate(columnSchema), createColumn);
router.delete("/:id", deleteColumn);

module.exports = router;
