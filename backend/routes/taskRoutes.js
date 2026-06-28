import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { validateCreateTask, validateUpdateTask } from "../middleware/validateTask.js";

const router = express.Router();

router.route("/").get(getTasks).post(validateCreateTask, createTask);

router
  .route("/:id")
  .get(getTaskById)
  .put(validateUpdateTask, updateTask)
  .delete(deleteTask);

export default router;
