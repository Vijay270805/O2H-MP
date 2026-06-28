import { useState } from "react";
import Button from "../ui/Button";
import { validateTaskForm } from "../../utils/validators";
import { DESCRIPTION_MIN_LENGTH } from "../../utils/constants";

/**
 * Shared form for both creating and editing a task.
 * Validates inline (matching the backend's rules exactly) so the
 * user sees feedback immediately instead of after a failed request.
 */
const TaskForm = ({ initialValues, onSubmit, onCancel, isSubmitting }) => {
  const [values, setValues] = useState({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    status: initialValues?.status ?? "pending",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateTaskForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await onSubmit(values);
  };

  const descriptionLength = values.description.trim().length;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={values.title}
          onChange={handleChange("title")}
          placeholder="e.g. Design the onboarding flow"
          className={`input-field ${errors.title ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100" : ""}`}
          maxLength={100}
        />
        {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Description <span className="text-rose-500">*</span>
          </label>
          <span
            className={`text-xs ${
              descriptionLength < DESCRIPTION_MIN_LENGTH ? "text-slate-400" : "text-emerald-500"
            }`}
          >
            {descriptionLength}/{DESCRIPTION_MIN_LENGTH} min
          </span>
        </div>
        <textarea
          id="description"
          rows={4}
          value={values.description}
          onChange={handleChange("description")}
          placeholder="Describe what needs to be done in at least 20 characters..."
          className={`input-field resize-none ${
            errors.description ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100" : ""
          }`}
          maxLength={1000}
        />
        {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Status
        </label>
        <select
          id="status"
          value={values.status}
          onChange={handleChange("status")}
          className="input-field cursor-pointer"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialValues ? "Save Changes" : "Create Task"}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
