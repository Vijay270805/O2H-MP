import ApiError from "../utils/ApiError.js";

const VALID_STATUSES = ["pending", "in-progress", "completed"];

/**
 * Validates the request body for creating a task.
 * Both title and description are required on create.
 */
export const validateCreateTask = (req, res, next) => {
  const { title, description, status } = req.body;
  const errors = [];

  if (!title || typeof title !== "string" || !title.trim()) {
    errors.push("Title is required.");
  } else if (title.trim().length > 100) {
    errors.push("Title cannot exceed 100 characters.");
  }

  if (!description || typeof description !== "string" || !description.trim()) {
    errors.push("Description is required.");
  } else if (description.trim().length < 20) {
    errors.push("Description must be at least 20 characters long.");
  }

  if (status && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}.`);
  }

  if (errors.length) {
    return next(new ApiError(400, errors.join(" ")));
  }

  next();
};

/**
 * Validates the request body for updating a task.
 * Fields are optional on update, but if present they must be valid.
 */
export const validateUpdateTask = (req, res, next) => {
  const { title, description, status } = req.body;
  const errors = [];

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      errors.push("Title cannot be empty.");
    } else if (title.trim().length > 100) {
      errors.push("Title cannot exceed 100 characters.");
    }
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length < 20) {
      errors.push("Description must be at least 20 characters long.");
    }
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}.`);
  }

  if (errors.length) {
    return next(new ApiError(400, errors.join(" ")));
  }

  next();
};
