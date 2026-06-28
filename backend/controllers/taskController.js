import { Op } from "sequelize";
import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * @desc    Get all tasks (supports filtering by status & searching by title)
 * @route   GET /api/tasks
 * @query   status  - "pending" | "in-progress" | "completed" (optional)
 * @query   search  - case-insensitive title search (optional)
 * @access  Public
 */
export const getTasks = asyncHandler(async (req, res) => {
  const { status, search } = req.query;
  const where = {};

  if (status && status !== "all") {
    where.status = status;
  }

  if (search && search.trim()) {
    where.title = { [Op.like]: `%${search.trim()}%` };
  }

  const tasks = await Task.findAll({ where, order: [["createdAt", "DESC"]] });

  // Stats are computed off the full, unfiltered table so the dashboard
  // cards always reflect the true state of all tasks, regardless of
  // the currently applied filter/search.
  const [total, completed, pending, inProgress] = await Promise.all([
    Task.count(),
    Task.count({ where: { status: "completed" } }),
    Task.count({ where: { status: "pending" } }),
    Task.count({ where: { status: "in-progress" } }),
  ]);

  const progressPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  res.status(200).json({
    success: true,
    count: tasks.length,
    stats: { total, completed, pending, inProgress, progressPercentage },
    data: tasks,
  });
});

/**
 * @desc    Get a single task by id
 * @route   GET /api/tasks/:id
 * @access  Public
 */
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  res.status(200).json({ success: true, data: task });
});

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Public
 */
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title: title.trim(),
    description: description.trim(),
    status: status || "pending",
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task,
  });
});

/**
 * @desc    Update an existing task (partial updates supported —
 *          this also doubles as the "mark as completed" endpoint
 *          when only { status: "completed" } is sent)
 * @route   PUT /api/tasks/:id
 * @access  Public
 */
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const { title, description, status } = req.body;

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description.trim();
  if (status !== undefined) task.status = status;

  const updatedTask = await task.save(); // re-runs model validators

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});

/**
 * @desc    Delete a task
 * @route   DELETE /api/tasks/:id
 * @access  Public
 */
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  await task.destroy();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: { id: req.params.id },
  });
});
