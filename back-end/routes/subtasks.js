const express = require("express");
const {
  getSubtasksByTask,
  createSubtask,
  deleteSubtask,
  updateSubtaskStatus,
} = require("../controller/subTasksController");
const validate = require("../middlewares/validate");
const { subtaskSchema } = require("../validators/subTaskValidator");
const router = express.Router();

router.get("/:taskId", getSubtasksByTask);
router.post("/", validate(subtaskSchema), createSubtask);
router.delete("/:id", deleteSubtask);
router.put("/:id", updateSubtaskStatus);

module.exports = router;
