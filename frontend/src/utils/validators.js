import { DESCRIPTION_MIN_LENGTH } from "./constants";

/**
 * Validates task form values on the client before they ever hit the network.
 * Mirrors the backend rules exactly so the user gets instant feedback
 * instead of waiting on a round-trip just to learn a field is invalid.
 *
 * @returns {{ title?: string, description?: string }} a map of field -> error message
 */
export const validateTaskForm = ({ title, description }) => {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = "Title is required.";
  } else if (title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters.";
  }

  if (!description || !description.trim()) {
    errors.description = "Description is required.";
  } else if (description.trim().length < DESCRIPTION_MIN_LENGTH) {
    errors.description = `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters (currently ${description.trim().length}).`;
  }

  return errors;
};

export const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
