const express = require("express");
const {
  getTasksByColumn,
  createTask,
  deleteTask,
  updateTask,
} = require("../controller/tasksController");
const validate = require("../middlewares/validate");
const { taskSchema } = require("../validators/taskValidator");
const router = express.Router();

router.get("/:columnId", getTasksByColumn);
router.post("/", validate(taskSchema), createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

module.exports = router;
