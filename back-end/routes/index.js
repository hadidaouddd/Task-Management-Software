const express = require("express");
const router = express.Router();

const boardRoutes = require("./boards");
const columnRoutes = require("./columns");
const taskRoutes = require("./tasks");
const subtaskRoutes = require("./subtasks");

router.use("/boards", boardRoutes);
router.use("/columns", columnRoutes);
router.use("/tasks", taskRoutes);
router.use("/subtasks", subtaskRoutes);

module.exports = router;
