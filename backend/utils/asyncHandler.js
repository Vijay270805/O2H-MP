/**
 * Wraps an async route handler so any thrown/rejected error is
 * forwarded to Express's `next()` instead of crashing the process
 * or requiring a try/catch block in every single controller.
 *
 * Usage: router.get("/", asyncHandler(getTasks));
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
