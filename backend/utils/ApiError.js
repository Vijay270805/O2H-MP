/**
 * A predictable, status-coded error used throughout the API.
 * Lets controllers throw `new ApiError(404, "Task not found")`
 * and have the central error handler respond consistently.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
