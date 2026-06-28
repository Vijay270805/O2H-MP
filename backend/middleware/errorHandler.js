import ApiError from "../utils/ApiError.js";

/**
 * Catches requests to routes that don't exist and forwards
 * a clean 404 ApiError into the error-handling pipeline.
 */
export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

/**
 * Single source of truth for error responses.
 * Normalizes Sequelize validation/database errors into the same
 * { success, message } shape the frontend always expects.
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Sequelize model validation error (e.g. "len" rule on description failed)
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(" ");
  }

  // Sequelize unique constraint violation
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(" ");
  }

  // Malformed/invalid value passed for a typed column (e.g. non-numeric :id)
  if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Invalid request data.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
